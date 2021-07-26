import { IScenario, IScenarioAction, IScenarioActionOrder } from './../../model/scenario/scenario.model';
import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/scenario-constants";

export class ScenarioServices extends GenericServices {
    getAllScenarios(params): Promise<ApiResponse> {
        return this.executeSelectingPost(params, Uri.getAllScenario).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    createScenario(scenario: IScenario): Promise<ApiResponse> {
        return this.executeSelectingPost(scenario, Uri.addUpdateScenario).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    updateScenario(scenario: IScenario): Promise<ApiResponse> {
        return this.executeSelectingPut(scenario, Uri.addUpdateScenario).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    deleteScenario(id: string): Promise<ApiResponse> {
        const url = Uri.deleteScenario.replace('{id}', id);
        return this.executeDeleting(url).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    getScenarioById(id): Promise<ApiResponse> {
        const url = Uri.getScenarioById.replace('{id}', id);
        return this.executeSelecting(null, url).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    createScenarioAction(payload: IScenarioAction): Promise<ApiResponse> {
        return this.executeSelectingPost(payload, Uri.addUpdateScenarioAction).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    updateScenarioAction(payload: IScenarioAction): Promise<ApiResponse> {
        return this.executeSelectingPut(payload, Uri.addUpdateScenarioAction).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    deleteScenarioAction(id: string): Promise<ApiResponse> {
        const url = Uri.deleteScenarioAction.replace('{id}', id);
        return this.executeDeleting(url).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }

    updateScenarioActionOrder(payload: IScenarioActionOrder[]): Promise<ApiResponse> {
        return this.executeSelectingPost({ actionOrders: payload }, Uri.updateScenarioActionOrder).then((response: ApiResponse) => {
            return response.isSuccess ? Promise.resolve(response.data) : Promise.reject(response.message);
        }).catch(error => Promise.reject(error))
    }
}
