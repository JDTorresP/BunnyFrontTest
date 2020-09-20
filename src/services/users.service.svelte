<script>
  const axios = require('axios');
  import { environment as ENV } from '../../environment';

  const USER_PATH_URL = `${ENV.api.base_path}${ENV.api.user.crud_users}`;

  export async function getAllUsers() {
      try {
        const response = await axios.get(USER_PATH_URL);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
  }

  export async function getUser(userId) {
      try {
        const response = await axios.get(`${USER_PATH_URL}/userId`);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
  }

</script>
