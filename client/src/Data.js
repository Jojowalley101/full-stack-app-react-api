//import Courses from './components/CourseDetail';
import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    } 
    
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }
// function to get the users' credentials 

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password});
    // console.log(response);
    // console.log(emailAddress);
    // console.log(password);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
//function to create a user (used for sign up)

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

//function that gets the courses from the database

  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }


  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      throw new Error('404');
    }
    else {
      throw new Error();
    }
  }

  async createCourses(course, emailAddress, password) {
    const response = await this.api(`/courses`, 'POST', course, true, {emailAddress, password});
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
  
//update course function to update the course

  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }

    else {
      throw new Error();
    }
  }

  //delete course function to delete the course

  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    } else if (response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
