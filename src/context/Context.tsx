import { createContext, useCallback, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext<Data>({
  favorites: [],
});

const AppUpdateFavoriteChampions = createContext<AddRemoveChampion>(() => {});

export type Data = {
  favorites: any;
};

const AppBuildsUpdate = createContext<AddItemBuild>(() => {});

export function useApp() {
  return useContext(AppContext);
}

export function useAppUpdateFavoriteChampions() {
  return useContext(AppUpdateFavoriteChampions);
}

export function useAppBuildsContext() {
  return useContext(AppBuildsUpdate);
}

type AddRemoveChampion = (id: string, data: any) => void;
type AddItemBuild = (champKey: string, index: number, item: any) => void;
export function ContextProvider({ children }: any) {
  const [favorites, setFavorites] = useLocalStorage("favorites", {});

  const addRemoveChampion = useCallback(
    (key: string, data: any) => {
      setFavorites((prev: any) => {
        // Utiliser Object.keys(prev.favorites) pour obtenir un tableau des clés
        if (!Object.keys(prev).includes(key)) {
          // Si la clé n'existe pas, ajouter le champion avec la nouvelle clé
          return { ...prev, [key]: { champion: data, build: [] } };
        } else {
          // Si la clé existe, filtrer le tableau des paires [clé, valeur] en excluant la clé actuelle
          const newFavorites = Object.fromEntries(
            Object.entries(prev).filter(([id]) => id !== key)
          );
          return newFavorites;
        }
      });
    },
    [favorites]
  );

  const addItemBuild = useCallback(
    (champKey: string, index: number, item: any) => {
      setFavorites((prev: any) => {
        const updatedFavorites = { ...prev };

        // Si le champion existe dans les favoris
        if (updatedFavorites[champKey]) {
          updatedFavorites[champKey].build[index] = item;

          return updatedFavorites;
        }

        return updatedFavorites;
      });
    },
    [favorites]
  );

  return (
    <AppContext.Provider value={favorites}>
      <AppUpdateFavoriteChampions.Provider value={addRemoveChampion}>
        <AppBuildsUpdate.Provider value={addItemBuild}>
          {children}
        </AppBuildsUpdate.Provider>
      </AppUpdateFavoriteChampions.Provider>
    </AppContext.Provider>
  );
}
