import axios from 'axios'
require('dotenv').config();


class UegenioApi {



    api = axios.create({
        baseURL: process.env.baseURL || 'http://localhost:5001'
    })


    async getClassrooms(filter: any) {
        let result;

        try {
            result = await this.api({
                method: 'get',
                url: '/classroom/filtro',
                params: {
                    ...filter
                },
                validateStatus: () => true
            });
        } catch (e) {

        }

        return result.data;
    }


    async getHoliday(filter: any) {
        let result;

        try {
            result = await this.api({
                method: 'get',
                url: '/holiday/filtro',
                params: {
                    ...filter
                },
                validateStatus: () => true
            });
        } catch (e) {

        }

        return result.data;
    }

    async getSemester(filter: any) {
        let result;

        try {
            result = await this.api({
                method: 'get',
                url: '/semester/filtro',
                params: {
                    ...filter
                },
                validateStatus: () => true
            });
        } catch (e) {

        }

        return result.data;
    }

    async getStudentsClassrooms(filter: any) {
        let result;

        try {
            result = await this.api({
                method: 'get',
                url: '/studentsClassrooms/filtro',
                params: {
                    ...filter
                },
                validateStatus: () => true
            });
        } catch (e) {

        }

        return result.data;
    }

    async getStudent(alexaID: string) {
        let result;
        try {
            result = await this.api({
                method: 'get',
                url: `/student/`,
                data: {
                    alexaID
                }
            });
        } catch (e) {

        }

        return result.data;
    }

    async registerUsersClassrooms(dataToSave: any) {
        let result;
        try {
            result = await this.api({
                method: 'put',
                url: `/student/addClass/`,
                data: {
                    ...dataToSave
                }
            });
        } catch (e) {
            console.log(e)
            throw new Error('Disciplina não encontrada');

        }

        return result.data;
    }




    async registerUser(alexaID: string) {
        const result = await this.api({
            method: 'post',
            url: '/student/',
            data: {
                alexaID
            }
        });

        return result;
    }

    async deleteClass(filter: any) {
        let result;
        try {
            result = await this.api({
                method: 'delete',
                url: '/studentsClassrooms/',
                data: {
                    ...filter
                }
            });
        } catch (e) {
            throw new Error('Disciplina não encontrada');
        }

        return result.data;
    }

    async getSolicitation(filter: any) {
        let result;
        try {
            result = await this.api({
                method: 'get',
                url: `/solicitation/`,
                data: {
                    ...filter
                },
                validateStatus: () => true
            });
        } catch (e) {

        }

        return result;
    }

}

export { UegenioApi }