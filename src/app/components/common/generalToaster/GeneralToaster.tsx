import toast from "react-hot-toast";

export default function GeneralToaster(message: string, status: string) {
    return status 
        ? toast.success(message, {
              style: {
                  border: "1px solid #d81b15",
                  padding: "16px",
                  color: "#242857",
              },
              iconTheme: {
                  primary: "#242857",
                  secondary: "#FFFAEE",
              },
          })
        : toast.error(message, {
              style: {
                  border: "1px solid #d81b15",
                  padding: "16px",
                  color: "#242857",
              },
              iconTheme: {
                  primary: "#d81b15",
                  secondary: "#FFFAEE",
              },
          });
}
