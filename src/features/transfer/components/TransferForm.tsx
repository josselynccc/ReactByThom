
import {  SubmitHandler, useForm } from "react-hook-form";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import "./TransferForm.css"
import { schema } from "./ValidacionYupHookForm";
import { fields } from "./Fields";
import { transferService } from "../../TransferManagement/http/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useBalanceStore } from "../../account/storeBalance/useBalanceStore";
import { addNotification } from "../store/uiSlice";
import { 
  setTransfers, 
  addTransfer, 
  updateTransfer, 
  deleteTransfer 
} from '../store/transferSlice';
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useDispatch } from "react-redux";

import { TransferFormData } from "../interface/types";
import { useEffect, useState } from "react";

const TransferForm = () =>{
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const dispatchTransfer = useAppDispatch();

    const [editingId, setEditingId] = useState<string | null | undefined>(null)
    const {register,reset,handleSubmit,setValue,formState:{errors}} =useForm({
        resolver: yupResolver(schema)
    });

    //practicando useBalanceStore de ZUSTAND
    const {addToBalance, substractFromBalance, adjustBalance} = useBalanceStore()

    /*const fetchTransfers = async () => {
        try {
            const data = await transferService.getAll();
            setTransfers(data);
        } catch (error) {
            console.error("Error al obtener transferencias:", error);
        }
    };*/

    //LISTAR CON TANSTACK QUERY

    const transfers = useAppSelector((state) => state.transfers.transfers);

    const [shouldFetch, setShouldFetch] = useState(true);

    const { 
      data: serverTransfers,
      isSuccess 
    } = useQuery({
      queryKey: ['transfers'],
      queryFn: async () => {
        const data = await transferService.getAll();
        const normalizedData = data.map(item => ({
          ...item,
          amount: Number(item.amount)
        }));
        return normalizedData;
      },
      enabled: shouldFetch,
      refetchOnWindowFocus: false,
      staleTime: Infinity 
    });
  
    useEffect(() => {
      if (isSuccess && serverTransfers && transfers.length === 0) {
        dispatch(setTransfers(serverTransfers));
        setShouldFetch(false);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, serverTransfers]);


    //CREATE CON TANSTACK QUERY
    const mutationCreate = useMutation({
      mutationFn: (newTransfer: TransferFormData) => transferService.create(newTransfer),
      onSuccess: (response: TransferFormData) => {
        if (!response) {
          console.error("Error: La respuesta no contiene datos", response);
          return;
        }
        queryClient.invalidateQueries({queryKey: ['transfers']})
        dispatch(addNotification('Transferencia creada!!'))
        dispatchTransfer(addTransfer(response))
        reset()
      },
      onError: (error: AxiosError) =>{
        alert(`Error: ${error.message}`)
      }
    })

    //DELETE CON TANSTACK QUERY
    const mutationDelete = useMutation({
      mutationFn: (id: string) => transferService.delete(id),
      onSuccess: (_,id)=>{
        queryClient.invalidateQueries({queryKey: ['transfers']})
        dispatch(addNotification('Transferencia eliminada!!'))
        dispatchTransfer(deleteTransfer(id))
      },
      onError: (error: AxiosError) =>{
        alert(`Error: ${error.message}`)
      }
    })

    //UPDATE CON TANSTACK QUERY
    const mutationUpdate = useMutation({
      mutationFn: ({id, transfer}:{id: string; transfer: TransferFormData}) => transferService.update(id,transfer),
      onSuccess: (_,variables) =>{
        const { id, transfer } = variables;
        dispatch(addNotification('Transferencia actualizada!!'))
        console.log(transfer)
        if (transfer) {
          dispatchTransfer(updateTransfer(transfer)); 
        }
        queryClient.invalidateQueries({queryKey: ['transfers']})
        setEditingId(null)

        const oldTransfer = queryClient.getQueryData<TransferFormData[]>(['transfers'])?.find(t => t.id === id);
        if (oldTransfer) {adjustBalance(oldTransfer.amount, transfer.amount);}
      },
      onError: (error:AxiosError) =>{
        alert(`Error: ${error.message}`)
      }
    })

    const onSubmit: SubmitHandler<TransferFormData> = async (transfer) => {
      if (editingId) {
        mutationUpdate.mutate({ id: editingId, transfer: transfer });
        reset()
      } else {
        mutationCreate.mutate(transfer);
        substractFromBalance(transfer.amount)
      }
    };

    const handleEdit = (transfer: TransferFormData) => {
      setEditingId(transfer.id);
        Object.entries(transfer).forEach(([key, value]) => {
          setValue(key as Exclude<keyof TransferFormData, "id">, value);
        });
    };

    const handleDelete = async (id: string | undefined, amount: number) => {
      if (!id) {
        alert('Error: ID inválido');
        return;
      }
      if (window.confirm('¿Estás seguro de eliminar esta transferencia?')) {
        mutationDelete.mutate(id)
        addToBalance(Number(amount))
      }
    };



    return(
        <>
        <form className="TransferForm" onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field) => (
                    <InputField
                        key={field.name.toString()}
                        id={field.name}
                        {...register(field.name as "name" | "accountNumber" | "amount" | "description" | "email" | "pin")}
                        label={field.label}
                        type={field.type}
                        error={errors[field.name as keyof typeof errors]?.message}
                        autoComplete={field.name === 'pin' ? 'current-password' : field.autoComplete || 'off'}
                    />
                ))}
                <Button text={editingId ? "Actualizar Transferencia" : "Realizar Transferencia"}/>
        </form>

        <div>
        <h3 className="subTitle">Lista de Transferencias</h3>
        <table className="TransferTable">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Número de Cuenta</th>
                <th>Monto</th>
                <th>Descripción</th>
                <th>Email</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {transfers?.map((transfer) => (
                <tr key={transfer.id}>
                <td>{transfer.name}</td>
                <td>{transfer.accountNumber}</td>
                <td>
                  {new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                    minimumFractionDigits: 2
                  }).format(transfer.amount)}
                </td>
                <td>{transfer.description}</td>
                <td>{transfer.email}</td>
                <td>
                    <Button onClick={() => handleEdit(transfer)} text="Editar"></Button>
                    <Button onClick={() => handleDelete(transfer.id, transfer.amount)} 
                    text="Eliminar"></Button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
        </>
    )
}

export default TransferForm;