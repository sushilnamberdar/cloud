import { UploadProvider } from "./UploadContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ...other imports
function App() {
  return (
    <UploadProvider>
      <>
        {/* ...your routes/components... */}
        <ToastContainer position="top-center" />
      </>
    </UploadProvider>
  );
}

export default App;