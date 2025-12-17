import { Route } from "react-router-dom";
import AdminAiStudio from "../Pages/AdminAiStudio";

export default function AdminRoutes({ user }) {
  if (!user || user.role !== "admin") return null;

  return (
    <>
      <Route path="/admin/ai" element={<AdminAiStudio />} />
    </>
  );
}
