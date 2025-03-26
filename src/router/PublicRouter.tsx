import { Navigate } from "react-router";
 
interface Props {
  isAuthenticated: boolean;
  children: React.ReactNode;
}
 
export const PublicRouter = ({ children, isAuthenticated }: Props) => {
  return isAuthenticated ? <Navigate to="/" /> : children;
};