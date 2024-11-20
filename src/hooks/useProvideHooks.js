import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useProvideHooks = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return {
    loading,
    setLoading,
    dispatch,
    navigate,
  };
};

export default useProvideHooks;
