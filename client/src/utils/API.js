export async function searchAllVillagers() {

    const villagersArray = [];

    await fetch(`http://acnhapi.com/v1a/villagers/`).then((response) => response.json()).then((data) => {

            for (let i = 0; i < data.length; i++) {

                const altNamesObj = {
                    ...data[i].name
                };

                const namesArr = Object.values(altNamesObj);

                // const fullKeyValue =  altNamesArray[0]; 
                const villager = {
                    id: data[i].id,
                    name: namesArr[0]
                }

                villagersArray.push(villager);
            }
        }
    )
    return villagersArray;
};


export async function getIdByName(nameStr) {

    const namesArr = await searchAllVillagers();

    for (let j = 0; j < namesArr.length; j++) {

        if (nameStr === namesArr[j].name) {

            return namesArr[j].id;
        }
    }
};


const getIconById = (id) => {

    return fetch(`http://acnhapi.com/v1/icons/villagers/${id}`);

};



export async function getNamesPlusNullArray(){

    const justNamesArr = [];
    const namesPlusNull =[];


const resp = await  fetch(`http://acnhapi.com/v1a/villagers/`)
.then((response) => response.json()).then((data) => {
    
        for (let i=0; i < data.length; i++) {

            const altNamesObj = { ...data[i].name };

          const namesArr =  Object.values(altNamesObj);

          justNamesArr.push(`'${namesArr[0]}': null`);

        };


        // justNamesArr.map((villager)=>{
        //     namesPlusNull.push(villager +": null") 
     return { ...justNamesArr };         
     
    } );

    
return resp;

};


export async function getVillagerbyId(apiId){

    const resp = await  fetch(`http://acnhapi.com/v1a/villagers/${apiId}`)
.then((response) => response.json())

    return resp;
}