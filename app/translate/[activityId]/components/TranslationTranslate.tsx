import { Button, TextField } from "@mui/material";
import { createTranslateForTranslationItem } from "../../service/fetcher";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const TranslationTranslate = ({
  id,
  translationTextProps,
  hasRemark,
}: {
  id: number;
  translationTextProps: string;
  hasRemark: boolean;
}) => {
  const session = useSession();
  const [token, setToken] = useState("");
  const [translationText, setTranslationText] = useState(
    translationTextProps
  );
  const [translationAttempted, setTranslationAttempted] = useState(false);

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

    setTranslationAttempted(true); // Set to true before making the API call

    createTranslateForTranslationItem(id, body, token)
      .then((data) => {
        console.log(data);
        // Handle successful translation if needed

        // Add a delay before resetting the state to trigger the animation
        setTimeout(() => {
          setTranslationAttempted(false);
        }, 500); // 1000 milliseconds (1 second) delay
      })
      .catch((err) => {
        console.log(err);
        // Handle error if needed
      });
  };

  return (
    <div className="flex">
      <TextField
        defaultValue={translationTextProps}
        fullWidth
        multiline
        onChange={(e) => setTranslationText(e.target.value)}
        className={hasRemark ? "bg-yellow-300" : ""}
      />
      <Button
        variant={translationAttempted ? "outlined" : "contained"}
        onClick={handleTranslate}
        sx={{ width: "8rem", ml: "1rem" }}
      >
        Save
      </Button>
    </div>
  );
};
