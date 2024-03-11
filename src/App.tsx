import Tmi from "tmi.js";
import { Modal } from "./components/Modal";
import { useTronchxs } from "./hooks/useTronchxs";
import { useState } from "react";
import { Tronchx } from "./Tronchx";

const client = new Tmi.Client({
  options: { debug: false },
  channels: ["afor_digital"],
});

function App() {
  const { tronchxs, updateTronchx } = useTronchxs(client);
  const [selectedTronchx, setSelectedTronchx] = useState<Tronchx | null>(null);

  const hasSelectedTroncho = !!selectedTronchx;

  const closeTronxhModal = () => {
    setSelectedTronchx(null);
  };

  const handleTronchxModalClose = closeTronxhModal;

  return (
    <>
      <Layout>
        <Tronchxs tronchxs={tronchxs} onTronchxSelect={setSelectedTronchx} />
      </Layout>

      {hasSelectedTroncho && (
        <TronchxModal
          isOpen={hasSelectedTroncho}
          updateTronchx={updateTronchx}
          tronchx={selectedTronchx}
          close={closeTronxhModal}
        />
      )}
    </>
  );
}

export default App;

interface ModalTypes {
  updateTronchx: (tronchx: Tronchx) => void;
  close: () => void;
  tronchx: Tronchx;
  isOpen: boolean;
}

const TronchxModal = ({
  close,
  updateTronchx,
  tronchx,
  isOpen,
}: ModalTypes) => {
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <Modal.Header>
        <h1>Editar tronchx</h1>
      </Modal.Header>
      <Modal.Content>
        <form
          id="edit-tronchx"
          onSubmit={(event) => {
            event.preventDefault();

            const form = event.target;

            if (!(form instanceof HTMLFormElement)) return;

            if (!("tronchxName" in form.elements)) return;
            if (!(form.elements.tronchxName instanceof HTMLInputElement))
              return;

            const tronchxName = form.elements.tronchxName.value;

            updateTronchx({
              ...tronchx,
              name: tronchxName,
            });
            close();
          }}
        >
          <label>
            Nombre
            <input
              name="tronchxName"
              defaultValue={tronchx.name}
              placeholder="Elige un nombre para el Tronchx"
              className="border-2 border-black"
              autoFocus
            />
          </label>
        </form>
      </Modal.Content>
      <Modal.Footer>
        <button type="submit" form="edit-tronchx">
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-min-screen h-full flex justify-center items-center bg-[#050505]">
      {children}
    </div>
  );
};

interface TronchxsTypes {
  tronchxs: Tronchx[];
  onTronchxSelect: (tronchx: Tronchx) => void;
}

const Tronchxs = ({ tronchxs, onTronchxSelect }: TronchxsTypes) => {
  return (
    <div className="grid grid-cols-6 gap-4 py-20">
      {tronchxs.map((tronchx) => (
        <button
          onClick={() => {
            onTronchxSelect(tronchx);
          }}
          style={{ background: tronchx.color }}
          className={`w-[150px] p-2 border-2 border-white h-[150px] flex items-center justify-center overflow-hidden`}
        >
          <span className="text-gray-800 truncate">{tronchx.name}</span>
        </button>
      ))}
    </div>
  );
};
