interface SettingItems {
    id: number
    title: string
    selected: boolean
}

export const SettingItems: SettingItems[] = [
    {
        id: 1,
        title: 'Account',
        selected: true,
    },
    {
        id: 2,
        title: 'Appearance',
        selected: false,
    },
    {
        id: 3,
        title: '',
        selected: false,
    }
]
