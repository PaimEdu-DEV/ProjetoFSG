import { useEffect, useState } from "react";
import { getMeta } from "../api";

let cache = null;
let inflight = null;

export function useMeta() {
  const [meta, setMeta] = useState(cache);
  useEffect(() => {
    if (cache) {
      setMeta(cache);
      return;
    }
    if (!inflight) inflight = getMeta().then((m) => (cache = m));
    let alive = true;
    inflight.then((m) => alive && setMeta(m));
    return () => {
      alive = false;
    };
  }, []);
  return meta;
}
