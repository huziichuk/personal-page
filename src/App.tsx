import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './styles/App.css'
import Home from "./pages/home/Home.tsx";
import MainLayout from "./layouts/mainLayout/MainLayout.tsx";
import NotFound from "./pages/notFound/NotFound.tsx";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />

                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
