import type { AxiosRequestConfig } from 'axios'
import { LoadingOptionsResolved } from 'element-plus'

export interface customRequestConfig extends AxiosRequestConfig {

    showLoading?: boolean,

    loadingConfig?: Partial<Omit<LoadingOptionsResolved, "target" | "parent"> & {

        target: string | HTMLElement;

        body: boolean;

    }>

}