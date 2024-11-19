import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import AdmiPage from "@/page/admi/AdmiPage";
// import Dashboard from '@/pages/Dashboard/Dashboard';
import PrivateRoute from "@/PrivateRoute/PrivateRoute";
import CitaPage from "../page/plataform/CitaPage";
import PresentPage from "../page/plataform/PresentPage";
import DocumentPage from "../page/user/DocumentPage";
import SeguimientoDocuPage from "../page/user/SeguimientoDocuPage";
import DocumentoPage from "../page/plataform/DocumentoPage";
import FilesPage from "../page/plataform/FilesPage";
import CitaCalendaryPage from "../page/user/CitaCalendaryPage";
import InfoCitaPage from "../page/user/InfoCitaPage";
import RevisionPage from "../page/plataform/RevisionPage";
import EmailVerifyPage from "../page/EmailVerifyPage";
import ReportAtencion from "@/page/admi/ReportAtencion"
import ReportCargoPdf from "../page/admi/ReportCargoPdf";
import HistoryCita from "@/page/admi/HistoryCita";
import ChartPage from "../page/admi/ChartPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/auth/verify-email" element={<EmailVerifyPage />} />

        {/* Rutas privadas user*/}
        <Route path="/tramite" element={<PrivateRoute requiredRole="user" />}>
          <Route path="confirmacion-de-cita" element={<InfoCitaPage />} />
          <Route path="cita" element={<CitaCalendaryPage />} />
          <Route path="documento/:slug" element={<DocumentPage />} />
          <Route
            path="documento-seguimiento/:slug"
            element={<SeguimientoDocuPage />}
          />
        </Route>
        {/* Rutas privadas dashboard*/}
        <Route
          path="/dashboard"
          element={<PrivateRoute requiredRole="platform-operator" />}
        >
          <Route path="cita-reservada/:idsection" element={<CitaPage />} />
          <Route path="files/:namesection/:id" element={<FilesPage />} />
          <Route path="revision/:namesection/:id" element={<RevisionPage />} />
          <Route path="documento/:namesection" element={<DocumentoPage />} />
          <Route path="presentacion" element={<PresentPage />} />
        </Route>
        {/* Rutas privadas administrador*/}
        <Route
          path="/dashboard/administrador"
          element={<PrivateRoute requiredRole="administrator" />}
        >
          <Route path="asignacion" element={<AdmiPage />} />
          <Route path="historial-revision" element={<ReportAtencion />} />
          <Route path="historial-reporte-cargo" element={<ReportCargoPdf />} />
          <Route path="historial-citas-estatico" element={<HistoryCita />} />
          <Route path="historial-chart" element={<ChartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
