import {gql} from "apollo-server-express";

export const listingTypeDefs = gql`

    extend  type Query {
        listings(city: String!): [Listing!]
    }

    type Parking {
        leased: String,
        spaces: Int,
        description: String
    }

    enum SubType {
        Apartment,
        Boatslip,
        SingleFamilyResidence,
        DeededParking,
        Cabin,
        Condominium,
        Duplex,
        Manufacturedhome,
        Ownyourown,
        Quadruplex,
        Stockcooperative,
        Townhouse,
        Timeshare,
        Triplex,
        Manufacturedonland,
        Farmandranch,
        Agriculture,
        Business,
        Hotelmotel,
        Industrial,
        Mixeduse,
        Officespace,
        Tetail,
        UnimprovedLand,
        Warehouse
    }

    enum Type {
        RES,
        RNT,
        MLH,
        CND,
        MUF,
        CML,
        LND,
        FRM,
    }

    enum Status {
        Active,
        Pending,
        Closed,
        ActiveUnderContract,
        Hold,
        Withdrawn,
        Expired,
        Delete,
        Incomplete,
        ComingSoon
    }


    type Property {

        roof: String,
        cooling: String,
        style: String,
        area: Int,
        bathsFull: Int,
        bathsHalf: Int,
        stories: Int,
        fireplaces: Int,
        flooring: String,
        heating: String,
        foundation: String,
        poolFeatures: String,
        laundryFeatures: String,
        occupantName: String,
        ownerName: String,
        lotDescription: String,
        lotSizeAcres: Int,
        subType: SubType,
        bedrooms: Int,
        interiorFeatures: String,
        lotSize: String,
        areaSource: String,
        maintenanceExpense: Int,
        additionalRooms: String,
        exteriorFeatures: String,
        water: String,
        view: String,
        lotSizeArea: Int,
        subdivision: String,
        construction: String,
        subTypeRaw: String,
        parking: Parking,
        lotSizeAreaUnits: String,
        type: Type,
        garageSpaces: Int,
        bathsThreeQuarter: Int,
        accessibility: String,
        occupantType: String,
        yearBuilt: Int
    }

    type Contact {
        email: String,
        office: String,
        cell: String
    }

    type Office {
        contact: Contact,
        name: String,
        servingName: String,
        brokerid: String
    }

    type Address {
        crossStreet: String,
        state: String,
        country: String,
        postalCode: String,
        streetName: String,
        streetNumberText: String,
        city: String,
        streetNumber: Int,
        full: String,
        unit: String
    }

    type Agent {
        lastName: String,
        contact: Contact,
        firstName: String,
        id: String
    }



    type School {
        middleSchool: String,
        highSchool: String,
        elementarySchool: String,
        district: String
    }

    type MLS {
        status: Status,
        area: String,
        daysOnMarket: Int,
        originalEntryTimestamp: String,
        originatingSystemName: String,
        statusText: String,
        areaMinor: String
    }

    type Geo {
        county: String,
        lat: Int,
        lng: Int,
        marketArea: String,
        directions: String
    }

    type Tax{
        taxYear: Int,
        taxAnnualAmount: Int,
        id: String
    }

    type Sales{
        closeDate: String,
        office: Office,
        closePrice: Int,
        agent: Agent,
        contractDate: String
    }

    type Associate {
        fee: Int,
        frequency: String,
        name: String,
        amenities: String
    }

    type Listing {
        privateRemarks: String,
        property: Property,
        mlsId: Int,
        showingInstructions: String,
        showingContactName: String,
        showingContactPhone: String,
        office: Office,
        leaseTerm: String,
        disclaimer: String,
        address: Address,
        listDate: String,
        agent: Agent,
        modified: String,
        school: School,
        photos: [String],
        listPrice: Int,
        originalListPrice: Int,
        internetAddressDisplay: Boolean,
        listingId: String,
        mls: MLS,
        internetEntireListingDisplay: Boolean,
        geo: Geo,
        tax: Tax,
        coAgent: Agent,
        sales: Sales,
        leaseType: String,
        virtualTourUrl: String,
        remarks: String,
        association: Associate,
        favoriteCount: Int
    }`