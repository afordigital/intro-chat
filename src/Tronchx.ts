export interface Tronchx {
  id: string
  name: string
  color: string
}

export const addTronchx = (
  tronchxs: Map<Tronchx['id'], Tronchx>,
  tronchx: Tronchx
) => {
  const { id } = tronchx
  if (tronchxs.has(id)) {
    return tronchxs
  } else {
    const updatedTronchxs = new Map(tronchxs)
    return updatedTronchxs.set(id, tronchx)
  }
}

export const updateTronchx = (
  tronchxs: Map<Tronchx['id'], Tronchx>,
  tronchx: Tronchx
) => {
  const { id } = tronchx
  if (!tronchxs.has(id)) {
    return tronchxs
  } else {
    const updatedTronchxs = new Map(tronchxs)
    return updatedTronchxs.set(id, tronchx)
  }
}
