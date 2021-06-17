export interface IScenario {
    scenarioId?: string;
    scenarioName: string;
    scenarioContent: string;
}

export class Scenario implements IScenario {
    scenarioId?: string;
    scenarioName: string;
    scenarioContent: string;

    constructor(option?: any) {
        this.scenarioId = option.scenarioId || null;
        this.scenarioName = option.scenarioName || null;
        this.scenarioContent = option.scenarioContent || '[]';
    }
}

export interface ISearchScenarioParameters {
    limit: number;
    page: number;
    total: number;
}
export class SearchScenarioParameters implements ISearchScenarioParameters {
    limit: number;
    page: number;
    total: number;
    constructor(option?: any) {
        this.limit = option.limit || 10;
        this.page = option.page || 1;
        this.total = option.total || 0;
    }
}
