import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { EntriesContext } from "@/context/entries/EntriesContext";
export const NewEntry = () => {

  const [touched, setTouched] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { addEntry, isAdding, setIsAdding } = useContext(EntriesContext)

  const onSave = () => {
    if (inputValue.length <= 0) return;
    console.log("onSave", inputValue);

    addEntry(inputValue);
    setIsAdding();
    setTouched(false);
    setInputValue("");
  };
  return (
    <Box sx={{ marginBottom: 2 }}>
      {isAdding ? (
        <div className="animate__animated animate__fadeInUp animate__faster">
          <TextField
            label="Nueva entrada"
            placeholder="Nueva entrada"
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            autoFocus
            multiline
            helperText={inputValue.length <= 0 && touched && "Ingrese un valor"}
            onBlur={() => setTouched(true)}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={() => setIsAdding()}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<SaveOutlinedIcon />}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </div>
      ) : (
        <Button
          startIcon={<AddCircleOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAdding()}
        >
          Agregar Tarea
        </Button>
      )}
    </Box>
  );
};
