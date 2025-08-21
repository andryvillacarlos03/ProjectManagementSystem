import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function FlashMessage() {
  const { flash } = usePage().props;
  const [show, setShow] = useState(!!flash?.success);

  useEffect(() => {
    if (flash?.success) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000); // hide after 3s
      return () => clearTimeout(timer);
    }
  }, [flash]);

  if (!show || !flash?.success) return null;

  return (
    <div
      className={`fixed bottom-5 left-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {flash.success}
    </div>
  );
}
