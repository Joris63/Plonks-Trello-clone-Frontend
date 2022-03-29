import Swal from "sweetalert2";

function FireToast(title, icon) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: icon,
    title: title,
  });
}

function FirePopup(
  title,
  text,
  icon,
  timer,
  confirmText,
  denyText,
  cancelText
) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    timer: timer,
    timerProgressBar: typeof timer === "number",
    showConfirmButton: typeof confirmText === "string",
    confirmButtonText: confirmText,
    showDenyButton: typeof denyText === "string",
    denyButtonText: confirmText,
    showCancelButton: typeof cancelText === "string",
    cancelButtonText: cancelText,
    customClass: {
      confirmButton: "swal_custom_confirm",
    },
  });
}

export { FireToast, FirePopup };
