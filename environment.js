export const environment = {
    external: {
        avatar_path: 'https://joeschmoe.io/api/v1/',
    },  
    api: {
        base_path: 'https://xw0a0youzj.execute-api.us-east-1.amazonaws.com/dev',
        user: {
            crud_users: '/users'
        },
        task: {
            crud_tasks: '/tasks',
        },
        utils: {
            get_all_tasks_by_user: '/tasks/assigned'
        }
        
    }
}