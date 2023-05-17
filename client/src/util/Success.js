import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function success(note){
    toast.success(note, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 1
        });

};
export {success}