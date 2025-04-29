
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/add" element={<AddPatient />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/schedule" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/book" element={<Appointments />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
