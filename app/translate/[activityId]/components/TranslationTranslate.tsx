"use client";
import { Button, TextField } from "@mui/material";
import { createTranslateForTranslationItem } from "../../service/fetcher";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const TranslationTranslate = ({
  id,
  translationTextProps,
  hasRemark
}: {
  id: number;
  translationTextProps: string;
  hasRemark: boolean
}) => {
  const session = useSession();
  const [token, setToken] = useState("");
  const [translationText, setTranslationText] = useState(translationTextProps);

  useEffect(() => {
    if (session.data?.user) {
      const { user } = session.data;
      const { idToken } = user;
      setToken(idToken);
    }
  }, [session]);
  const handleTranslate = () => {
    const body = {
      translationText: translationText.length > 0 ? translationText : null,
    };
    createTranslateForTranslationItem(id, body, token)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <div className='flex'>
      <TextField
        defaultValue={translationTextProps}
        fullWidth
        multiline
        onChange={(e) => setTranslationText(e.target.value)}
        className={hasRemark ? 'bg-yellow-300' : ''}
      />
      <Button
        variant="contained"
        onClick={handleTranslate}
        sx={{ width: "8rem", ml: "1rem" }}
      >
        Save
      </Button>
    </div>
  );
};
