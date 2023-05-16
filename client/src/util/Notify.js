import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function  Notify(note){
    toast.warn(note, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: 2

        });
};
export {Notify}