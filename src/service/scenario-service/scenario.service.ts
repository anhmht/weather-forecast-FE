import { IScenario } from './../../model/scenario/scenario.model';
import { ApiResponse } from "@/model/app-config";
import { GenericServices } from "../generic-service/generic.service";
import Uri from "@/constant/uri/scenario-constants";

export class ScenarioServices extends GenericServices {
    getAllScenarios(params): Promise<ApiResponse> {
        return this.executeSelectingPost(params, Uri.getAllScenario).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }

    createScenario(scenario: IScenario): Promise<ApiResponse> {
        return this.executeSelectingPost(scenario, Uri.addUpdateScenario).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }

    updateScenario(scenario: IScenario): Promise<ApiResponse> {
        return this.executeSelectingPut(scenario, Uri.addUpdateScenario).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }

    deleteScenario(id: string): Promise<ApiResponse> {
        const url = Uri.deleteScenario.replace('{id}', id);
        return this.executeDeleting(url).then((response: ApiResponse) => {
            return Promise.resolve(response)
        }).catch(error => Promise.reject(error))
    }
}
