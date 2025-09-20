import { BrowserRouter, Routes, Route} from "react-router-dom"
import LoginPage from "../components/pages/login";
import RegisterPage from "../components/pages/register";
import HomePage from "../components/pages/home";
import ArticlesPage from "../components/pages/articles";
import BlogsPage from "../components/pages/blogs";
import SupplementsPage from "../components/pages/supplements";
import MainLayout from "../components/layouts/MainLayout";
import { ContactPage } from "../components/pages/contact";
import Breadcrumb from "../components/molecules/Breadcrumb";
import { AboutPage } from "../components/pages/about";
import { TemplateInformation } from "../components/pages/InformationSuplements";
import InformationArticles from "../components/pages/InformationArticles";
import InformationBlogs from "../components/pages/InformationBlogs";
import { EditionContainer } from "../components/pages/EditionContainer";
import ProfilePage from "../components/pages/profile";
import EditProfilePage from "../components/pages/editProfile";


const AppNavigator = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Breadcrumb />
        <Routes>
          {/* Páginas públicas - automáticamente incluyen Header */}
          <Route path="/" element={<HomePage />} />
          <Route path="/articulos" element={<ArticlesPage />} />
          <Route path="/articulos/:id" element={<InformationArticles />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<InformationBlogs />} />

          <Route path="/suplemento-semanal" element={<SupplementsPage />} />
          <Route path="/ediciones" element={<EditionContainer />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/perfil/editar-perfil" element={<EditProfilePage />} />


          <Route path="/informacion-suplementos" element={<TemplateInformation />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          {/* Páginas de autenticación - sin Header (configurado en MainLayout) */}
          <Route path="/iniciar-sesion" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />

          {/* Agregar más rutas aquí siguiendo el mismo patrón */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default AppNavigator;