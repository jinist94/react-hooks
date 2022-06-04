import { useCallback, useEffect, useMemo } from "react";

// const hotKeys = [
//   {
//     global: true,
//     combo: 'ctrl+k',
//     onkeydown: (e) => {
//       alert('ctrl+k');
//     },
//   },
// ];

const ModifierBitMasks = {
  alt: 1,
  ctrl: 2,
  meta: 4,
  shift: 8,
};

const getKeyCombo = (e) => {
  console.log(e);
  const key = e.key !== " " ? e.key.toLowerCase() : "space";

  let modifiers = 0;

  if (e.altKey) {
    modifiers += ModifierBitMasks.alt;
  }
  if (e.ctrlKey) {
    modifiers += ModifierBitMasks.ctrl;
  }
  if (e.metaKey) {
    modifiers += ModifierBitMasks.meta;
  }
  if (e.shiftKey) {
    modifiers += ModifierBitMasks.shift;
  }

  return { modifiers, key };
};

const ShiftKey = {
  "~": "`",
  "!": "1",
  "@": "2",
  "#": "3",
  $: "4",
  "%": "5",
  "^": "6",
  "&": "7",
  "*": "8",
  "(": "9",
  ")": "0",
  _: "-",
  "+": "=",
  "{": "[",
  "}": "]",
  "|": "\\",
  ":": ";",
  '"': "'",
  "<": ",",
  ">": ".",
  "?": "/",
};

const Aliases = {
  win: "meta",
  window: "meta",
  cmd: "meta",
  command: "meta",
  esc: "escape",
  opt: "alt",
  option: "alt",
};

const parseKeyCombo = (combo) => {
  const pieces = combo.replace(/\s/g, "").toLowerCase().split("+");
  let modifiers = 0;
  let key;
  for (const piece of pieces) {
    if (ModifierBitMasks[piece]) {
      modifiers += ModifierBitMasks[piece];
    } else if (ShiftKey[piece]) {
      modifiers += ModifierBitMasks.shift;
      key = ShiftKey[piece];
    } else if (Aliases[piece]) {
      key = Aliases[piece];
    } else {
      key = piece;
    }
  }

  return { modifiers, key };
};

const comboMatches = (a, b) => {
  return a.modifiers === b.modifiers && a.key === b.key;
};

const useHotKey = (hotKeys) => {
  const localKeys = useMemo(() => hotKeys.filter((k) => !k.global), [hotKeys]);
  const globalKeys = useMemo(() => hotKeys.filter((k) => k.global), [hotKeys]);

  const invokeCallback = useCallback(
    (global, combo, callbackName, e) => {
      for (const hotkey of global ? globalKeys : localKeys) {
        // global의 여부를 확인하여 글로벌키를 처리할 지 로컬키를 처리할 지 확인

        if (comboMatches(parseKeyCombo(hotkey.combo), combo)) {
          hotkey[callbackName] && hotkey[callbackName](e);
        }
      }
    },
    [localKeys, globalKeys]
  );

  const handleGlobalKeyDown = useCallback(
    (e) => {
      invokeCallback(true, getKeyCombo(e), "onKeydown", e);
    },
    [invokeCallback]
  );

  const handleGlobalKeyUp = useCallback(
    (e) => {
      invokeCallback(true, getKeyCombo(e), "onKeyup", e);
    },
    [invokeCallback]
  );

  const handleLocalKeyDown = useCallback(
    (e) => {
      invokeCallback(false, getKeyCombo(e.nativeEvent), "onKeydown", e.nativeEvent);
    },
    [invokeCallback]
  );

  const handleLocalKeyUp = useCallback(
    (e) => {
      invokeCallback(false, getKeyCombo(e.nativeEvent), "onKeyup", e.nativeEvent);
    },
    [invokeCallback]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleGlobalKeyDown);
    document.addEventListener("keyup", handleGlobalKeyUp);
  }, [handleGlobalKeyDown, handleGlobalKeyUp]);

  return { handleKeyDown: handleLocalKeyDown, handleKeyUp: handleLocalKeyUp };
};

export default useHotKey;

/*
const hotKeys = [
  {
    global: true,
    combo: 'ctrl+m',
    onKeydown: (e) => {
      alert('ctrl+k!');
    },
  },
  {
    combo: 'esc',
    onKeydown: (e) => {
      alert('esc!');
    },
  },
];
*/
