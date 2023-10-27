import { clsx } from 'clsx';
import Image from 'next/image'

/* eslint-disable @next/next/no-img-element */
export interface CardProps {
  preview: string
  github?: string
  previewImage?: string
  title: string
  desc: string
}

export const Card: React.FC<CardProps> = ({ preview, github, previewImage, title, desc }) => {
  return <div className={clsx('card card-compact bg-base-100 lg:w-80 xl:w-96 shadow-xl sm:w-80')}>
    {previewImage ? <figure><Image src={previewImage} alt={title} width="400" height="200" /></figure> : null}
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>{desc}</p>
      <div className="card-actions justify-end mt-2">
        {github ? <a target="_blank" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mr-4" href={github}>GitHub</a> : null}
        {preview ? <a target="_blank" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" href={preview}>Preview</a> : null}
      </div>
    </div>
  </div>
}
