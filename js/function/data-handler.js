import { getMdComponent } from "../components/data/component-data.js";
import { getPalletData as getPalletJsonDataObject } from "../components/data/pallet-data.js";
import { userData } from "../components/data/user-data.js";
import { ADDRESS_TEXTFIELD_ID, CITY_TEXTFIELD_ID, COMPANY_TEXTFIELD_ID, DELIVERY_DOCUMENT_TEXTFIELD_ID, EMAIL_TEXTFIELD_ID, EPAL_QUANTITY_TEXTFIELD_ID, ORDER_NOTES_TEXTAREA_ID, PACKAGE_QUANTITY_TEXTFIELD_ID, PACKAGE_VOLUME_TEXTFIELD_ID, PACKAGE_WEIGHT_TEXTFIELD_ID, PALLET_HEIGHT_TEXTFIELD_ID, PALLET_LENGHT_TEXTFIELD_ID, PALLET_OPEN_DROPDOWN_TYPE_BUTTON_ID, PALLET_OVERALL_VOLUME_ID, PALLET_OVERALL_WEIGTH_ID, PALLET_QUANTITY_TEXTFIELD_ID, PALLET_TYPE_ATTRIBUTE_ID, PALLET_WEIGHT_TEXTFIELD_ID, PALLET_WIDTH_TEXTFIELD_ID, PHONE_TEXTFIELD_ID, POSTALCODE_TEXTFIELD_ID, PROVINCE_TEXTFIELD_ID, SERVICE_OPEN_DROPDOWN_TYPE_BUTTON_ID, SERVICE_TYPE_ATTRIBUTE_ID } from "../constant/costant.js";
import { palletTypeMapper } from "../mapper/data-mapper.js";

export function saveEmail(){
    userData.email = getMdComponent(EMAIL_TEXTFIELD_ID).value;
}

export function saveRegistrationData(){
    saveUserInfo()
}

export function getPalletData(){
    let palletHeight = getMdComponent(PALLET_HEIGHT_TEXTFIELD_ID).value;
    let palletLenght = getMdComponent(PALLET_LENGHT_TEXTFIELD_ID).value;
    let palletWidth = getMdComponent(PALLET_WIDTH_TEXTFIELD_ID).value;
    let palletWeight = getMdComponent(PALLET_WEIGHT_TEXTFIELD_ID).value;
    let palletQuantity = getMdComponent(PALLET_QUANTITY_TEXTFIELD_ID).value;

    let palletTypeId = document.getElementById(PALLET_OPEN_DROPDOWN_TYPE_BUTTON_ID).getAttribute(PALLET_TYPE_ATTRIBUTE_ID);
    
    //TODO adapt the logic to the ENUM
    let palletTypeName = palletTypeMapper.get(palletTypeId);

    //Overall weigth
    let overallWeight = calculatPalletOverallWeight(palletWeight, palletQuantity);

    //Overall Volume
    let overallVolume = calculatPalletOverallVolume(palletHeight, palletLenght, palletWidth, palletQuantity);

    //Create object
    let palletData = {
        height: palletHeight,
        weight: palletWeight,
        lenght: palletLenght,
        width: palletWidth,
        quantity: palletQuantity,
        typeName: palletTypeName,
        typeId: palletTypeId,
        overallWeight: overallWeight,
        overallVolume: overallVolume
    }

    return palletData;
}

export function saveOrderData(){
    userData.deliveryDocument = getMdComponent(DELIVERY_DOCUMENT_TEXTFIELD_ID).value;
    userData.serviceType = document.getElementById(SERVICE_OPEN_DROPDOWN_TYPE_BUTTON_ID).getAttribute(SERVICE_TYPE_ATTRIBUTE_ID);
    //Optional
    userData.packageQuantity = getMdComponent(PACKAGE_QUANTITY_TEXTFIELD_ID).value;
    userData.orderNotes = getMdComponent(ORDER_NOTES_TEXTAREA_ID).value;
}

export function updateOverallData(palletData){
    removePalletWeigth(palletData);
    removePalletVolume(palletData);
}

export function saveRecipientData(){
    saveUserInfo();
}

function saveUserInfo(){
    userData.company = getMdComponent(COMPANY_TEXTFIELD_ID).value;
    userData.address = getMdComponent(ADDRESS_TEXTFIELD_ID).value;
    userData.province = getMdComponent(PROVINCE_TEXTFIELD_ID).value;
    userData.city = getMdComponent(CITY_TEXTFIELD_ID).value;
    userData.postalCode = getMdComponent(POSTALCODE_TEXTFIELD_ID).value;
    userData.phone = getMdComponent(PHONE_TEXTFIELD_ID).value;
}

function calculatPalletOverallWeight(palletWeight, palletQuantity){
    let overallWeightElement = document.getElementById(PALLET_OVERALL_WEIGTH_ID);

    let weight = palletWeight * palletQuantity;
    weight = parseFloat(weight.toFixed(2));

    userData.orderWeight = userData.orderWeight + weight;

    //UI
    overallWeightElement.textContent = userData.orderWeight;

    return weight;
}

function calculatPalletOverallVolume(palletHeight, palletLenght, palletWidth, palletQuantity){
    let overallVolumeElement = document.getElementById(PALLET_OVERALL_VOLUME_ID);

    let volume = (palletHeight * palletLenght * palletWidth) / 1_000_000;
    volume = volume * palletQuantity;
    volume = parseFloat(volume.toFixed(2));

    userData.orderVolume = userData.orderVolume + volume;

    //UI
    overallVolumeElement.textContent = userData.orderVolume;

    return volume;
}

function removePalletWeigth(palletData){
    let overallWeightElement = document.getElementById(PALLET_OVERALL_WEIGTH_ID);

    userData.orderWeight = userData.orderWeight - palletData.overallWeight;

    //UI
    overallWeightElement.textContent = userData.orderWeight;
}

function removePalletVolume(palletData){
    let overallVolumeElement = document.getElementById(PALLET_OVERALL_VOLUME_ID);

    userData.orderVolume = userData.orderVolume - palletData.overallVolume;

    //UI
    overallVolumeElement.textContent =  userData.orderVolume;
}