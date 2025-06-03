export interface IBaseFormProps {
  handleSelectType?: (e: unknown) => void
  maxImagesCount: () => (images: {rawFile: File}[]) => string | undefined
  type?: string
}
