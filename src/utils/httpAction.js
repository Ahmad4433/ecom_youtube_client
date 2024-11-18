import toast from "react-hot-toast";
const httpAction = (data) => async () => {
  try {
    const response = await fetch(data.url, {
      method: data.method ? data.method : "GET",
      body: data.formData
        ? data.formData
        : data.body
        ? JSON.stringify(data.body)
        : null,
      headers: data.formData ? {} : { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    toast.error(error.message);
    console.log(error.message)
  }
};

export default httpAction;
