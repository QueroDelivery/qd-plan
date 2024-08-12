import { PlanoAcao } from 'src/components/PlanAcaoTable';
import { create } from 'zustand';

type AcaoModalStore = {
  isOpen: boolean;
  onOpen: (data: PlanoAcao) => void;
  onClose: () => void;
  data: PlanoAcao | null;
};

const useAcaoModalStore = create<AcaoModalStore>((set) => ({
  isOpen: false,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: null }),
  data: null,
}));

export default useAcaoModalStore;
