export interface Tronchx {
  id: string
  name: string
  color: string
}
type PartialTronchxWithId = Partial<Tronchx> & { id: Tronchx['id'] }

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

export const editTronchx = (
  tronchxs: Map<Tronchx['id'], Tronchx>,
  tronchx: PartialTronchxWithId
) => {
  const { id } = tronchx
  if (!tronchxs.has(id)) {
    return tronchxs
  } else {
    const updatedTronchxs = new Map(tronchxs)
    return updatedTronchxs.set(id, { ...updatedTronchxs.get(id)!, ...tronchx })
  }
}
