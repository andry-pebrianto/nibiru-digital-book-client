/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const useSnap = () => {
  const [snap, setSnap] = useState<any>(null);

  useEffect(() => {
    const myMidtransClientKey = process.env.MIDTRANS_CLIENT_KEY;
    const script = document.createElement("script");
    script.src = `${process.env.MIDTRANS_APP_URL}/snap/snap.js`;
    script.setAttribute("data-client-key", myMidtransClientKey || "");
    script.onload = () => {
      setSnap((window as any).snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (snap_token: string, embedId: string) => {
    if (snap) {
      snap.embed(snap_token, {
        embedId,
      });
    }
  };

  const snapHide = () => {
    if (snap) {
      snap.hide();
    }
  };

  return { snapEmbed, snapHide };
};
