import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './styles/App.css'
import Home from "./pages/home/Home.tsx";
import MainLayout from "./layouts/mainLayout/MainLayout.tsx";
import NotFound from "./pages/notFound/NotFound.tsx";
import Contact from "./pages/contact/Contact.tsx";
import Skills from "./pages/skills/Skills.tsx";
import About from "./pages/about/About.tsx";
import Projects from "./pages/projects/Projects.tsx";
import {lazy, Suspense} from "react";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.tsx";
import Loading from "./pages/loading/Loading.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";

const AdminLayout = lazy(() => import("./layouts/adminLayout/AdminLayout"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"))
const Login = lazy(() => import("./pages/login/Login"));

function App() {
    return (
        <>
            <Router>
                <Suspense fallback={<Loading/>}>
                    <AuthProvider>
                        <Routes>
                            <Route path="/" element={<MainLayout/>}>
                                <Route index element={<Home/>}/>
                                <Route path="about" element={<About/>}/>
                                <Route path="contact" element={<Contact/>}/>
                                <Route path="skills" element={<Skills/>}/>
                                <Route path="projects" element={<Projects/>}/>
                                <Route path="*" element={<NotFound/>}/>
                            </Route>

                            <Route path="/admin" element={<AdminLayout/>}>
                                <Route index element={
                                    <ProtectedRoute>
                                        <Dashboard/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="login" element={<Login/>}/>
                            </Route>
                        </Routes>
                    </AuthProvider>
                </Suspense>
            </Router>
        </>
    )
}

export default App