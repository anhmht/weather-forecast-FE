export interface IScenario {
    scenarioId?: string;
    scenarioName?: string;
    scenarioContent?: string;
    scenarioActions?: IScenarioAction[];
}

export class Scenario implements IScenario {
    scenarioId?: string;
    scenarioName?: string;
    scenarioContent?: string;
    scenarioActions?: IScenarioAction[];

    constructor(option?: any) {
        this.scenarioId = option.scenarioId || null;
        this.scenarioName = option.scenarioName || null;
        this.scenarioContent = option.scenarioContent || '[]';
        this.scenarioActions = option.scenarioActions || [];
    }
}

export interface IScenarioAction {
    id?: string;
    scenarioId?: string;
    actionTypeId?: number;
    methodId?: number;
    areaTypeId?: number;
    data?: string;
    duration?: number;
    order?: number;
    isEnableIcon?: boolean;
    isEnableLayer?: boolean;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    scenarioActionDetails?: IScenarioActionDetail[];
}

export class ScenarioAction implements IScenarioAction {
    id?: string;
    scenarioId?: string;
    actionTypeId?: number;
    methodId?: number;
    areaTypeId?: number;
    data?: string;
    duration?: number;
    order?: number;
    isEnableIcon?: boolean;
    isEnableLayer?: boolean;
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
    scenarioActionDetails?: IScenarioActionDetail[];

    constructor(option?: IScenarioAction) {
        this.id = option.id || null;
        this.scenarioId = option.scenarioId || null;
        this.actionTypeId = option.actionTypeId || null;
        this.methodId = option.methodId || null;
        this.areaTypeId = option.areaTypeId || null;
        this.data = option.data || null;
        this.duration = option.duration || 0;
        this.order = option.order || 0;
        this.isEnableIcon = option.isEnableIcon || false;
        this.isEnableLayer = option.isEnableLayer || false;
        this.top = option.top || null
        this.left = option.left || null
        this.right = option.right || null
        this.bottom = option.bottom || null
        this.scenarioActionDetails = option.scenarioActionDetails || [];
    }
}

export interface IScenarioActionDetail {
    id?: string;
    actionId?: string;
    scenarioActionTypeId?: number;
    actionTypeId?: number;
    methodId?: number;
    content?: string;
    duration?: number;
    startTime?: number
    positionId?: number;
    customPosition?: boolean;
    left?: number;
    top?: number;
    isDisplay?: boolean;
    width?: number;
    placeId?: string;
    isProvince?: boolean;
    iconsList?: string[];
    time?: number;
    isEnableIcon?: boolean;
    iconUrls?: string;
}

export class ScenarioActionDetail implements IScenarioActionDetail {
    id?: string;
    actionId?: string;
    scenarioActionTypeId?: number;
    actionTypeId?: number;
    methodId?: number;
    content?: string;
    duration?: number;
    startTime?: number
    positionId?: number;
    customPosition?: boolean;
    left?: number;
    top?: number;
    isDisplay?: boolean;
    width?: number;
    placeId?: string;
    isProvince?: boolean;
    iconsList?: string[];
    time?: number;
    isEnableIcon?: boolean;
    iconUrls?: string;

    constructor(option?: IScenarioActionDetail) {
        this.id = option.id || null
        this.actionId = option.actionId || null
        this.scenarioActionTypeId = option.scenarioActionTypeId || null
        this.actionTypeId = option.actionTypeId || null
        this.methodId = option.methodId || null
        this.content = option.content || null
        this.duration = option.duration || null
        this.startTime = option.startTime || null
        this.positionId = option.positionId || null
        this.customPosition = option.customPosition || false
        this.left = option.left || null
        this.top = option.top || null
        this.isDisplay = option.isDisplay || false
        this.width = option.width || null
        this.placeId = option.placeId || null
        this.isProvince = option.isProvince || false
        this.iconsList = option.iconsList || []
        this.time = option.time || 0;
        this.isEnableIcon = option.isEnableIcon || false;
        this.iconUrls = option.iconUrls || null;
    }
}

export interface IScenarioActionOrder {
    actionId: string;
    order: number
}

export class ScenarioActionOrder implements IScenarioActionOrder {
    actionId: string;
    order: number
    constructor(option?: IScenarioActionOrder) {
        this.actionId = option.actionId || null;
        this.order = option.order || 0;
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
