import { EntriesContext } from "@/context/entries/EntriesContext";
import { UIContext } from "@/context/ui/UIcontext";
import { Entry } from "@/interfaces/entries";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale/es";

export const EntryCard = ({ entry }: { entry: Entry }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");

  const { isDragging, startDragging, endDragging } = useContext(UIContext);
  const { updatedEntry, deleteEntry } = useContext(EntriesContext);

  useEffect(() => {
    setValue(entry.description);
  }, []);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", entry._id);
    startDragging();
  };

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    endDragging();
  };

  const submitUpdateEntry = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      console.log(value);
      let data = { ...entry, description: value };
      updatedEntry(data);
      setIsEditing(false);
    }
  };

  const getformatDistanceToNow = (date: number) => {
    return formatDistanceToNow(date, {
      locale: es,
    });
  };

  return (
    <Card sx={{ marginBottom: 1 }} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <CardActionArea>
        <CardContent sx={{ padding: "4px 6px" }}>
          {isEditing ? (
            <TextField
              placeholder=""
              multiline={false}
              variant="standard"
              fullWidth
              value={value}
              sx={{ marginBottom: 1 }}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => submitUpdateEntry(e)}
              onBlur={() => setIsEditing(false)}
              autoFocus
            />
          ) : (
            <Typography
              sx={{ whiteSpace: "pre-line", wordBreak: "break-all" }}
              onClick={() => setIsEditing(true)}
            >
              {entry.description}
            </Typography>
          )}
        </CardContent>

        <CardActions sx={{ display: "flex", justifyContent: "space-between", paddingRight: 2 }}>
          <DeleteIcon
            onClick={() => deleteEntry(entry._id)}
            fontSize="inherit"
            color="error"
            sx={{ fontSize: 30 }}
          />
          <Typography variant="body2">Hace {getformatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
