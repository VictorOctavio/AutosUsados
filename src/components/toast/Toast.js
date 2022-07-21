import toast from "react-hot-toast";

export const errMessage = (message) => {
    return toast.error(message)
}

export const successMessage = (message) => {
    return toast.success(message)
}