// 功能菜单的表单类型
export enum VisualEditorPropsType {
    input = 'input',
    color = "color",
    select = "select"
}

// 功能菜单的类型
export type VisualEditorProps = {
    type: VisualEditorPropsType; // 枚举 input、color、select
    label: string;
} & {
    options?: VisualEditorSelectOptions // 下拉框选项
}

// 创建select下拉框属性
export type VisualEditorSelectOptions = {
    label: string,
    val: string
}[]

// 创建input输入框属性
export function createEditorInputProp(label: string): VisualEditorProps {
    return {
        type: VisualEditorPropsType.input,
        label
    }
}

// 创建color颜色选择器属性
export function createEditorColorProp(label: string): VisualEditorProps {
    return {
        type: VisualEditorPropsType.color,
        label
    }
}

// 创建下拉框属性
export function createEditorSelectProp(label: string, options: VisualEditorSelectOptions): VisualEditorProps {
    return {
        type: VisualEditorPropsType.select,
        label,
        options
    }
}