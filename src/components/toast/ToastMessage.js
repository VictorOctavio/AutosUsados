import { useSelector } from "react-redux"
import toast, { Toaster } from "react-hot-toast";

export const ToastMessage = () => {

    const message = useSelector(store => store.app.message);
    const message_user = useSelector(store => store.user.message_user);

    const errMessage = (message) => toast.error(message);
    const successMessage = (message) => toast.success(message);

    message.active && (
        message.err ? errMessage(message.message):successMessage(message.message)
    )

    message_user.active && (
        message_user.err ? errMessage(message_user.message):successMessage(message_user.message)
    )

    return (
        <>
            < Toaster position="bottom-center" />
        </>
    )
}