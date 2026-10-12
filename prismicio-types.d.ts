import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type AboutUsDocumentDataSlicesSlice = ContentSlice | GallerySlice | ImageSliderSlice | HeroSlice

/**
 * Content for About Us documents
 */
interface AboutUsDocumentData {
	/**
	 * Slice Zone field in *About Us*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about_us.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<AboutUsDocumentDataSlicesSlice>;/**
	 * Meta Description field in *About Us*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: about_us.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *About Us*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about_us.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
	
	/**
	 * Meta Title field in *About Us*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: about_us.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * About Us document from Prismic
 *
 * - **API ID**: `about_us`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AboutUsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<AboutUsDocumentData>, "about_us", Lang>;

type AccomodationDocumentDataSlicesSlice = HeroWithSearchSlice | HeroSlice | GallerySlice | AccomodationListSlice

/**
 * Content for Accommodation documents
 */
interface AccomodationDocumentData {
	/**
	 * Slice Zone field in *Accommodation*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<AccomodationDocumentDataSlicesSlice>;/**
	 * Meta Description field in *Accommodation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: accomodation.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Accommodation*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
	
	/**
	 * Meta Title field in *Accommodation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: accomodation.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * Accommodation document from Prismic
 *
 * - **API ID**: `accomodation`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AccomodationDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<AccomodationDocumentData>, "accomodation", Lang>;

/**
 * Item in *Accommodation Single → Amenities*
 */
export interface AccomodationSingleDocumentDataAmenitiesItem {
	/**
	 * Amenity field in *Accommodation Single → Amenities*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.amenities[].amenity
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	amenity: prismic.KeyTextField;
}

/**
 * Item in *Accommodation Single → FAQ*
 */
export interface AccomodationSingleDocumentDataFaqItem {
	/**
	 * Question field in *Accommodation Single → FAQ*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.faq[].question
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	question: prismic.KeyTextField;
	
	/**
	 * Answer field in *Accommodation Single → FAQ*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.faq[].answer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	answer: prismic.KeyTextField;
}

/**
 * Item in *Accommodation Single → Gallery*
 */
export interface AccomodationSingleDocumentDataGalleryItem {
	/**
	 * Photo field in *Accommodation Single → Gallery*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.gallery[].photo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo: prismic.ImageField<never>;
}

/**
 * Item in *Accommodation Single → Pricing*
 */
export interface AccomodationSingleDocumentDataPricingItem {
	/**
	 * Period start field in *Accommodation Single → Pricing*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.pricing[].period_start
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	period_start: prismic.DateField;
	
	/**
	 * Period end field in *Accommodation Single → Pricing*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.pricing[].period_end
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	period_end: prismic.DateField;
	
	/**
	 * Price field in *Accommodation Single → Pricing*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.pricing[].price
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	price: prismic.NumberField;
}

type AccomodationSingleDocumentDataSlicesSlice = never

/**
 * Content for Accommodation Single documents
 */
interface AccomodationSingleDocumentData {
	/**
	 * Heading field in *Accommodation Single*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.heading
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * iCal field in *Accommodation Single*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.ical
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	ical: prismic.KeyTextField;
	
	/**
	 * Cover Image field in *Accommodation Single*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.cover_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	cover_image: prismic.ImageField<never>;
	
	/**
	 * Guests field in *Accommodation Single*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.guests
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	guests: prismic.NumberField;
	
	/**
	 * Bedrooms field in *Accommodation Single*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.bedrooms
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	bedrooms: prismic.NumberField;
	
	/**
	 * Beds field in *Accommodation Single*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.beds
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	beds: prismic.NumberField;
	
	/**
	 * Bathrooms field in *Accommodation Single*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.bathrooms
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	bathrooms: prismic.NumberField;
	
	/**
	 * Description field in *Accommodation Single*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Amenities field in *Accommodation Single*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.amenities[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	amenities: prismic.GroupField<Simplify<AccomodationSingleDocumentDataAmenitiesItem>>;
	
	/**
	 * Distances field in *Accommodation Single*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.distances
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	distances: prismic.RichTextField;
	
	/**
	 * House Rules field in *Accommodation Single*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.house_rules
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	house_rules: prismic.RichTextField;
	
	/**
	 * Summary field in *Accommodation Single*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.summary
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	summary: prismic.RichTextField;
	
	/**
	 * Important Information field in *Accommodation Single*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.important_information
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	important_information: prismic.RichTextField;
	
	/**
	 * FAQ field in *Accommodation Single*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.faq[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	faq: prismic.GroupField<Simplify<AccomodationSingleDocumentDataFaqItem>>;
	
	/**
	 * Gallery field in *Accommodation Single*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.gallery[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	gallery: prismic.GroupField<Simplify<AccomodationSingleDocumentDataGalleryItem>>;
	
	/**
	 * Pricing field in *Accommodation Single*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.pricing[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	pricing: prismic.GroupField<Simplify<AccomodationSingleDocumentDataPricingItem>>;
	
	/**
	 * Is Featured field in *Accommodation Single*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: accomodation_single.isFeatured
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	isFeatured: prismic.BooleanField;
	
	/**
	 * Slice Zone field in *Accommodation Single*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<AccomodationSingleDocumentDataSlicesSlice>;/**
	 * Meta Description field in *Accommodation Single*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: accomodation_single.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Accommodation Single*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_single.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
	
	/**
	 * Meta Title field in *Accommodation Single*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: accomodation_single.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * Accommodation Single document from Prismic
 *
 * - **API ID**: `accomodation_single`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AccomodationSingleDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<AccomodationSingleDocumentData>, "accomodation_single", Lang>;

type ContactDocumentDataSlicesSlice = HeroSlice

/**
 * Content for Contact documents
 */
interface ContactDocumentData {
	/**
	 * Heading field in *Contact*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.heading
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Image field in *Contact*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Slice Zone field in *Contact*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<ContactDocumentDataSlicesSlice>;/**
	 * Meta Description field in *Contact*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: contact.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Contact*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
	
	/**
	 * Meta Title field in *Contact*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: contact.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * Contact document from Prismic
 *
 * - **API ID**: `contact`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ContactDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<ContactDocumentData>, "contact", Lang>;

type ForRentersDocumentDataSlicesSlice = ForRentersHeroSlice | FeatureGridSlice | ProcessStepsSlice | FaqSlice

/**
 * Content for For Renters (old - archive) documents
 */
interface ForRentersDocumentData {
	/**
	 * Slice Zone field in *For Renters (old - archive)*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<ForRentersDocumentDataSlicesSlice>;/**
	 * Meta Description field in *For Renters (old - archive)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: for_renters.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *For Renters (old - archive)*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
	
	/**
	 * Meta Title field in *For Renters (old - archive)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: for_renters.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * For Renters (old - archive) document from Prismic
 *
 * - **API ID**: `for_renters`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ForRentersDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<ForRentersDocumentData>, "for_renters", Lang>;

type HomepageDocumentDataSlicesSlice = TourListSlice | AccomodationListSlice | HeroSlice

/**
 * Content for homepage documents
 */
interface HomepageDocumentData {
	/**
	 * Slice Zone field in *homepage*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice>;/**
	 * Meta Description field in *homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: homepage.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *homepage*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
	
	/**
	 * Meta Title field in *homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: homepage.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomepageDocumentData>, "homepage", Lang>;

type OwnersLandingDocumentDataSlicesSlice = ForRentersHeroSlice | FeatureGridSlice | ProcessStepsSlice | FaqSlice

/**
 * Content for For Renters documents
 */
interface OwnersLandingDocumentData {
	/**
	 * Slice Zone field in *For Renters*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: owners_landing.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<OwnersLandingDocumentDataSlicesSlice>;/**
	 * Meta Title field in *For Renters*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: owners_landing.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *For Renters*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: owners_landing.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *For Renters*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: owners_landing.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * For Renters document from Prismic
 *
 * - **API ID**: `owners_landing`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type OwnersLandingDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<OwnersLandingDocumentData>, "owners_landing", Lang>;

type PrivacyPolicyDocumentDataSlicesSlice = ContentSlice | HeroSlice

/**
 * Content for Privacy Policy documents
 */
interface PrivacyPolicyDocumentData {
	/**
	 * Slice Zone field in *Privacy Policy*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_policy.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<PrivacyPolicyDocumentDataSlicesSlice>;/**
	 * Meta Description field in *Privacy Policy*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: privacy_policy.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Privacy Policy*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: privacy_policy.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
	
	/**
	 * Meta Title field in *Privacy Policy*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: privacy_policy.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * Privacy Policy document from Prismic
 *
 * - **API ID**: `privacy_policy`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PrivacyPolicyDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<PrivacyPolicyDocumentData>, "privacy_policy", Lang>;

/**
 * Content for Services documents
 */
interface ServicesDocumentData {
	/**
	 * Heading field in *Services*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.heading
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Overtitle field in *Services*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.overtitle
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	overtitle: prismic.KeyTextField;
	
	/**
	 * Service1 Heading field in *Services*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service1_heading
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	service1_heading: prismic.KeyTextField;
	
	/**
	 * Service1 Subtitle field in *Services*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service1_subtitle
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	service1_subtitle: prismic.KeyTextField;
	
	/**
	 * Service1 Image field in *Services*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service1_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	service1_image: prismic.ImageField<never>;
	
	/**
	 * Service1 Link field in *Services*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service1_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	service1_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Service2 Heading field in *Services*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service2_heading
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	service2_heading: prismic.KeyTextField;
	
	/**
	 * Service2 Subtitle field in *Services*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service2_subtitle
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	service2_subtitle: prismic.KeyTextField;
	
	/**
	 * Service2 Image field in *Services*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service2_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	service2_image: prismic.ImageField<never>;
	
	/**
	 * Service2 Link field in *Services*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service2_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	service2_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Service3 Heading field in *Services*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service3_heading
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	service3_heading: prismic.KeyTextField;
	
	/**
	 * Service3 Subtitle field in *Services*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service3_subtitle
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	service3_subtitle: prismic.KeyTextField;
	
	/**
	 * Service3 Image field in *Services*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service3_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	service3_image: prismic.ImageField<never>;
	
	/**
	 * Service3 Link field in *Services*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service3_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	service3_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Service4 Heading field in *Services*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service4_heading
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	service4_heading: prismic.KeyTextField;
	
	/**
	 * Service4 Subtitle field in *Services*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service4_subtitle
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	service4_subtitle: prismic.KeyTextField;
	
	/**
	 * Service4 Image field in *Services*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service4_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	service4_image: prismic.ImageField<never>;
	
	/**
	 * Service4 Link field in *Services*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: services.service4_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	service4_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Services document from Prismic
 *
 * - **API ID**: `services`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ServicesDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<ServicesDocumentData>, "services", Lang>;

type TermsAndConditionsDocumentDataSlicesSlice = HeroSlice | ContentSlice

/**
 * Content for Terms And Conditions documents
 */
interface TermsAndConditionsDocumentData {
	/**
	 * Slice Zone field in *Terms And Conditions*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: terms_and_conditions.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<TermsAndConditionsDocumentDataSlicesSlice>;/**
	 * Meta Description field in *Terms And Conditions*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: terms_and_conditions.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Terms And Conditions*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: terms_and_conditions.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
	
	/**
	 * Meta Title field in *Terms And Conditions*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: terms_and_conditions.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * Terms And Conditions document from Prismic
 *
 * - **API ID**: `terms_and_conditions`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type TermsAndConditionsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<TermsAndConditionsDocumentData>, "terms_and_conditions", Lang>;

type ToursDocumentDataSlicesSlice = TourListSlice | HeroSlice

/**
 * Content for Tours documents
 */
interface ToursDocumentData {
	/**
	 * Slice Zone field in *Tours*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<ToursDocumentDataSlicesSlice>;/**
	 * Meta Description field in *Tours*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: tours.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Tours*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
	
	/**
	 * Meta Title field in *Tours*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: tours.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * Tours document from Prismic
 *
 * - **API ID**: `tours`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ToursDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<ToursDocumentData>, "tours", Lang>;

/**
 * Item in *Tours Single → Price Includes*
 */
export interface ToursSingleDocumentDataPriceIncludesItem {
	/**
	 * Included field in *Tours Single → Price Includes*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.price_includes[].included
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	included: prismic.KeyTextField;
}

/**
 * Item in *Tours Single → Price Excludes*
 */
export interface ToursSingleDocumentDataPriceExcludesItem {
	/**
	 * Excluded field in *Tours Single → Price Excludes*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.price_excludes[].excluded
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	excluded: prismic.KeyTextField;
}

/**
 * Item in *Tours Single → Itinerary*
 */
export interface ToursSingleDocumentDataItineraryItem {
	/**
	 * Heading field in *Tours Single → Itinerary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.itinerary[].heading
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Content field in *Tours Single → Itinerary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.itinerary[].content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
}

/**
 * Item in *Tours Single → FAQ*
 */
export interface ToursSingleDocumentDataFaqItem {
	/**
	 * Question field in *Tours Single → FAQ*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.faq[].question
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	question: prismic.KeyTextField;
	
	/**
	 * Answer field in *Tours Single → FAQ*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.faq[].answer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	answer: prismic.KeyTextField;
}

/**
 * Item in *Tours Single → Gallery*
 */
export interface ToursSingleDocumentDataGalleryItem {
	/**
	 * Photo field in *Tours Single → Gallery*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.gallery[].photo
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo: prismic.ImageField<never>;
}

type ToursSingleDocumentDataSlicesSlice = never

/**
 * Content for Tours Single documents
 */
interface ToursSingleDocumentData {
	/**
	 * Heading field in *Tours Single*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.heading
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Cover Image field in *Tours Single*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.cover_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	cover_image: prismic.ImageField<never>;
	
	/**
	 * Location field in *Tours Single*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.location
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	location: prismic.KeyTextField;
	
	/**
	 * Price field in *Tours Single*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.price
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	price: prismic.KeyTextField;
	
	/**
	 * Duration field in *Tours Single*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.duration
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	duration: prismic.KeyTextField;
	
	/**
	 * min_age field in *Tours Single*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.min_age
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	min_age: prismic.KeyTextField;
	
	/**
	 * Description field in *Tours Single*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Price Includes field in *Tours Single*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.price_includes[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	price_includes: prismic.GroupField<Simplify<ToursSingleDocumentDataPriceIncludesItem>>;
	
	/**
	 * Price Excludes field in *Tours Single*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.price_excludes[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	price_excludes: prismic.GroupField<Simplify<ToursSingleDocumentDataPriceExcludesItem>>;
	
	/**
	 * Itinerary field in *Tours Single*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.itinerary[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	itinerary: prismic.GroupField<Simplify<ToursSingleDocumentDataItineraryItem>>;
	
	/**
	 * FAQ field in *Tours Single*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.faq[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	faq: prismic.GroupField<Simplify<ToursSingleDocumentDataFaqItem>>;
	
	/**
	 * Gallery field in *Tours Single*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.gallery[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	gallery: prismic.GroupField<Simplify<ToursSingleDocumentDataGalleryItem>>;
	
	/**
	 * Is Featured field in *Tours Single*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: tours_single.isFeatured
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	isFeatured: prismic.BooleanField;
	
	/**
	 * Slice Zone field in *Tours Single*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<ToursSingleDocumentDataSlicesSlice>;/**
	 * Meta Description field in *Tours Single*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: tours_single.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Tours Single*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tours_single.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
	
	/**
	 * Meta Title field in *Tours Single*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: tours_single.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * Tours Single document from Prismic
 *
 * - **API ID**: `tours_single`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ToursSingleDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<ToursSingleDocumentData>, "tours_single", Lang>;

/**
 * Item in *Transfers → HowToBook*
 */
export interface TransfersDocumentDataHowtobookItem {
	/**
	 * Heading field in *Transfers → HowToBook*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: transfers.howtobook[].heading
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Content field in *Transfers → HowToBook*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: transfers.howtobook[].content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
}

type TransfersDocumentDataSlicesSlice = TransferServiceSliceSlice | TransferContactFormSliceSlice | ImageSliderSlice | HeroSlice | GallerySlice

/**
 * Content for Transfers documents
 */
interface TransfersDocumentData {
	/**
	 * Heading field in *Transfers*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: transfers.heading
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Image field in *Transfers*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: transfers.image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Content field in *Transfers*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: transfers.content
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
	
	/**
	 * HowToBook field in *Transfers*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: transfers.howtobook[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	howtobook: prismic.GroupField<Simplify<TransfersDocumentDataHowtobookItem>>;
	
	/**
	 * Slice Zone field in *Transfers*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: transfers.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<TransfersDocumentDataSlicesSlice>;/**
	 * Meta Description field in *Transfers*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: transfers.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Transfers*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: transfers.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
	
	/**
	 * Meta Title field in *Transfers*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: transfers.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
}

/**
 * Transfers document from Prismic
 *
 * - **API ID**: `transfers`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type TransfersDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<TransfersDocumentData>, "transfers", Lang>;

export type AllDocumentTypes = AboutUsDocument | AccomodationDocument | AccomodationSingleDocument | ContactDocument | ForRentersDocument | HomepageDocument | OwnersLandingDocument | PrivacyPolicyDocument | ServicesDocument | TermsAndConditionsDocument | ToursDocument | ToursSingleDocument | TransfersDocument;

/**
 * Primary content in *AccommodationList → Default → Primary*
 */
export interface AccomodationListSliceDefaultPrimary {
	/**
	 * Heading field in *AccommodationList → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_list.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Overtitle field in *AccommodationList → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: accomodation_list.default.primary.overtitle
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	overtitle: prismic.KeyTextField;
	
	/**
	 * Limit field in *AccommodationList → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: No limit
	 * - **API ID Path**: accomodation_list.default.primary.limit
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	limit: prismic.SelectField<"No limit" | "2" | "3" | "4" | "5" | "6" | "7" | "8", "filled">;
}

/**
 * Default variation for AccommodationList Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type AccomodationListSliceDefault = prismic.SharedSliceVariation<"default", Simplify<AccomodationListSliceDefaultPrimary>, never>;

/**
 * Slice variation for *AccommodationList*
 */
type AccomodationListSliceVariation = AccomodationListSliceDefault

/**
 * AccommodationList Shared Slice
 *
 * - **API ID**: `accomodation_list`
 * - **Description**: AccomodationList
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type AccomodationListSlice = prismic.SharedSlice<"accomodation_list", AccomodationListSliceVariation>;

/**
 * Primary content in *Content → Default → Primary*
 */
export interface ContentSliceDefaultPrimary {
	/**
	 * Content field in *Content → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: content.default.primary.content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
}

/**
 * Default variation for Content Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContentSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ContentSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Content*
 */
type ContentSliceVariation = ContentSliceDefault

/**
 * Content Shared Slice
 *
 * - **API ID**: `content`
 * - **Description**: Content
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContentSlice = prismic.SharedSlice<"content", ContentSliceVariation>;

/**
 * Item in *Faq → Default → Primary → Items*
 */
export interface FaqSliceDefaultPrimaryItemsItem {
	/**
	 * Question field in *Faq → Default → Primary → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq.default.primary.items[].question
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	question: prismic.KeyTextField;
	
	/**
	 * Answer field in *Faq → Default → Primary → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq.default.primary.items[].answer
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	answer: prismic.RichTextField;
}

/**
 * Primary content in *Faq → Default → Primary*
 */
export interface FaqSliceDefaultPrimary {
	/**
	 * Overtitle field in *Faq → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq.default.primary.overtitle
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	overtitle: prismic.KeyTextField;
	
	/**
	 * Heading field in *Faq → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *Faq → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Items field in *Faq → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq.default.primary.items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	items: prismic.GroupField<Simplify<FaqSliceDefaultPrimaryItemsItem>>;
}

/**
 * Default variation for Faq Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FaqSliceDefault = prismic.SharedSliceVariation<"default", Simplify<FaqSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Faq*
 */
type FaqSliceVariation = FaqSliceDefault

/**
 * Faq Shared Slice
 *
 * - **API ID**: `faq`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FaqSlice = prismic.SharedSlice<"faq", FaqSliceVariation>;

/**
 * Item in *FeatureGrid → Default → Primary → Items*
 */
export interface FeatureGridSliceDefaultPrimaryItemsItem {
	/**
	 * Title field in *FeatureGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: feature_grid.default.primary.items[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *FeatureGrid → Default → Primary → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: feature_grid.default.primary.items[].description
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	description: prismic.KeyTextField;
}

/**
 * Primary content in *FeatureGrid → Default → Primary*
 */
export interface FeatureGridSliceDefaultPrimary {
	/**
	 * Overtitle field in *FeatureGrid → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: feature_grid.default.primary.overtitle
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	overtitle: prismic.KeyTextField;
	
	/**
	 * Heading field in *FeatureGrid → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: feature_grid.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *FeatureGrid → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: feature_grid.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Items field in *FeatureGrid → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: feature_grid.default.primary.items[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	items: prismic.GroupField<Simplify<FeatureGridSliceDefaultPrimaryItemsItem>>;
}

/**
 * Default variation for FeatureGrid Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FeatureGridSliceDefault = prismic.SharedSliceVariation<"default", Simplify<FeatureGridSliceDefaultPrimary>, never>;

/**
 * Slice variation for *FeatureGrid*
 */
type FeatureGridSliceVariation = FeatureGridSliceDefault

/**
 * FeatureGrid Shared Slice
 *
 * - **API ID**: `feature_grid`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FeatureGridSlice = prismic.SharedSlice<"feature_grid", FeatureGridSliceVariation>;

/**
 * Item in *ForRentersHero → Default → Primary → Highlights*
 */
export interface ForRentersHeroSliceDefaultPrimaryHighlightsItem {
	/**
	 * Label field in *ForRentersHero → Default → Primary → Highlights*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters_hero.default.primary.highlights[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Emphasis field in *ForRentersHero → Default → Primary → Highlights*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters_hero.default.primary.highlights[].emphasis
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	emphasis: prismic.KeyTextField;
}

/**
 * Item in *ForRentersHero → Default → Primary → Service options*
 */
export interface ForRentersHeroSliceDefaultPrimaryServiceOptionsItem {
	/**
	 * Option label field in *ForRentersHero → Default → Primary → Service options*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters_hero.default.primary.service_options[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
}

/**
 * Primary content in *ForRentersHero → Default → Primary*
 */
export interface ForRentersHeroSliceDefaultPrimary {
	/**
	 * Eyebrow field in *ForRentersHero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Ursus · Split
	 * - **API ID Path**: for_renters_hero.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Heading field in *ForRentersHero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters_hero.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *ForRentersHero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters_hero.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Supporting text field in *ForRentersHero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters_hero.default.primary.supporting_text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	supporting_text: prismic.RichTextField;
	
	/**
	 * Highlights field in *ForRentersHero → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters_hero.default.primary.highlights[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	highlights: prismic.GroupField<Simplify<ForRentersHeroSliceDefaultPrimaryHighlightsItem>>;
	
	/**
	 * CTA field in *ForRentersHero → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters_hero.default.primary.cta
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Form eyebrow field in *ForRentersHero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Pošaljite upit
	 * - **API ID Path**: for_renters_hero.default.primary.form_eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	form_eyebrow: prismic.KeyTextField;
	
	/**
	 * Form heading field in *ForRentersHero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters_hero.default.primary.form_heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	form_heading: prismic.RichTextField;
	
	/**
	 * Form description field in *ForRentersHero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters_hero.default.primary.form_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	form_description: prismic.RichTextField;
	
	/**
	 * Form submit label field in *ForRentersHero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Zatražite ponudu
	 * - **API ID Path**: for_renters_hero.default.primary.form_submit_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	form_submit_label: prismic.KeyTextField;
	
	/**
	 * Form privacy note field in *ForRentersHero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters_hero.default.primary.form_privacy_note
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	form_privacy_note: prismic.RichTextField;
	
	/**
	 * Service options field in *ForRentersHero → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: for_renters_hero.default.primary.service_options[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	service_options: prismic.GroupField<Simplify<ForRentersHeroSliceDefaultPrimaryServiceOptionsItem>>;
}

/**
 * Default variation for ForRentersHero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ForRentersHeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ForRentersHeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *ForRentersHero*
 */
type ForRentersHeroSliceVariation = ForRentersHeroSliceDefault

/**
 * ForRentersHero Shared Slice
 *
 * - **API ID**: `for_renters_hero`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ForRentersHeroSlice = prismic.SharedSlice<"for_renters_hero", ForRentersHeroSliceVariation>;

/**
 * Primary content in *Gallery → Default → Primary*
 */
export interface GallerySliceDefaultPrimary {
	/**
	 * Heading field in *Gallery → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gallery.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Overtitle field in *Gallery → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gallery.default.primary.overtitle
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	overtitle: prismic.KeyTextField;
}

/**
 * Primary content in *Gallery → Items*
 */
export interface GallerySliceDefaultItem {
	/**
	 * Image field in *Gallery → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: gallery.items[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Default variation for Gallery Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GallerySliceDefault = prismic.SharedSliceVariation<"default", Simplify<GallerySliceDefaultPrimary>, Simplify<GallerySliceDefaultItem>>;

/**
 * Slice variation for *Gallery*
 */
type GallerySliceVariation = GallerySliceDefault

/**
 * Gallery Shared Slice
 *
 * - **API ID**: `gallery`
 * - **Description**: Gallery
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GallerySlice = prismic.SharedSlice<"gallery", GallerySliceVariation>;

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
	/**
	 * Heading field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Image field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Primary content in *HeroWithSearch → Default → Primary*
 */
export interface HeroWithSearchSliceDefaultPrimary {
	/**
	 * Heading field in *HeroWithSearch → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_with_search.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Image field in *HeroWithSearch → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero_with_search.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Default variation for HeroWithSearch Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroWithSearchSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroWithSearchSliceDefaultPrimary>, never>;

/**
 * Slice variation for *HeroWithSearch*
 */
type HeroWithSearchSliceVariation = HeroWithSearchSliceDefault

/**
 * HeroWithSearch Shared Slice
 *
 * - **API ID**: `hero_with_search`
 * - **Description**: HeroWithSearch
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroWithSearchSlice = prismic.SharedSlice<"hero_with_search", HeroWithSearchSliceVariation>;

/**
 * Primary content in *ImageSlider → Items*
 */
export interface ImageSliderSliceDefaultItem {
	/**
	 * Image field in *ImageSlider → Items*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_slider.items[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Default variation for ImageSlider Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageSliderSliceDefault = prismic.SharedSliceVariation<"default", Record<string, never>, Simplify<ImageSliderSliceDefaultItem>>;

/**
 * Slice variation for *ImageSlider*
 */
type ImageSliderSliceVariation = ImageSliderSliceDefault

/**
 * ImageSlider Shared Slice
 *
 * - **API ID**: `image_slider`
 * - **Description**: ImageSlider
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageSliderSlice = prismic.SharedSlice<"image_slider", ImageSliderSliceVariation>;

/**
 * Item in *ProcessSteps → Default → Primary → Steps*
 */
export interface ProcessStepsSliceDefaultPrimaryStepsItem {
	/**
	 * Title field in *ProcessSteps → Default → Primary → Steps*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: process_steps.default.primary.steps[].title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *ProcessSteps → Default → Primary → Steps*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: process_steps.default.primary.steps[].description
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	description: prismic.KeyTextField;
}

/**
 * Primary content in *ProcessSteps → Default → Primary*
 */
export interface ProcessStepsSliceDefaultPrimary {
	/**
	 * Overtitle field in *ProcessSteps → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: process_steps.default.primary.overtitle
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	overtitle: prismic.KeyTextField;
	
	/**
	 * Heading field in *ProcessSteps → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: process_steps.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *ProcessSteps → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: process_steps.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Steps field in *ProcessSteps → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: process_steps.default.primary.steps[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	steps: prismic.GroupField<Simplify<ProcessStepsSliceDefaultPrimaryStepsItem>>;
}

/**
 * Default variation for ProcessSteps Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ProcessStepsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ProcessStepsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *ProcessSteps*
 */
type ProcessStepsSliceVariation = ProcessStepsSliceDefault

/**
 * ProcessSteps Shared Slice
 *
 * - **API ID**: `process_steps`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ProcessStepsSlice = prismic.SharedSlice<"process_steps", ProcessStepsSliceVariation>;

/**
 * Primary content in *TourList → Default → Primary*
 */
export interface TourListSliceDefaultPrimary {
	/**
	 * Heading field in *TourList → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tour_list.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Overtitle field in *TourList → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tour_list.default.primary.overtitle
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	overtitle: prismic.KeyTextField;
	
	/**
	 * Limit field in *TourList → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **API ID Path**: tour_list.default.primary.limit
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	limit: prismic.SelectField<"No limit" | "2" | "3" | "4" | "5" | "6" | "7" | "8">;
}

/**
 * Default variation for TourList Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TourListSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TourListSliceDefaultPrimary>, never>;

/**
 * Slice variation for *TourList*
 */
type TourListSliceVariation = TourListSliceDefault

/**
 * TourList Shared Slice
 *
 * - **API ID**: `tour_list`
 * - **Description**: TourList
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TourListSlice = prismic.SharedSlice<"tour_list", TourListSliceVariation>;

/**
 * Default variation for TransferContactFormSlice Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TransferContactFormSliceSliceDefault = prismic.SharedSliceVariation<"default", Record<string, never>, never>;

/**
 * Slice variation for *TransferContactFormSlice*
 */
type TransferContactFormSliceSliceVariation = TransferContactFormSliceSliceDefault

/**
 * TransferContactFormSlice Shared Slice
 *
 * - **API ID**: `transfer_contact_form_slice`
 * - **Description**: TransferContactFormSlice
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TransferContactFormSliceSlice = prismic.SharedSlice<"transfer_contact_form_slice", TransferContactFormSliceSliceVariation>;

/**
 * Item in *TransferServiceSlice → Default → Primary → HowToBook*
 */
export interface TransferServiceSliceSliceDefaultPrimaryHowtobookItem {
	/**
	 * Heading field in *TransferServiceSlice → Default → Primary → HowToBook*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: transfer_service_slice.default.primary.howtobook[].heading
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	heading: prismic.KeyTextField;
	
	/**
	 * Content field in *TransferServiceSlice → Default → Primary → HowToBook*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: transfer_service_slice.default.primary.howtobook[].content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
}

/**
 * Primary content in *TransferServiceSlice → Default → Primary*
 */
export interface TransferServiceSliceSliceDefaultPrimary {
	/**
	 * Content field in *TransferServiceSlice → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: transfer_service_slice.default.primary.content
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	content: prismic.RichTextField;
	
	/**
	 * HowToBook field in *TransferServiceSlice → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: transfer_service_slice.default.primary.howtobook[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	howtobook: prismic.GroupField<Simplify<TransferServiceSliceSliceDefaultPrimaryHowtobookItem>>;
}

/**
 * Default variation for TransferServiceSlice Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TransferServiceSliceSliceDefault = prismic.SharedSliceVariation<"default", Simplify<TransferServiceSliceSliceDefaultPrimary>, never>;

/**
 * Slice variation for *TransferServiceSlice*
 */
type TransferServiceSliceSliceVariation = TransferServiceSliceSliceDefault

/**
 * TransferServiceSlice Shared Slice
 *
 * - **API ID**: `transfer_service_slice`
 * - **Description**: TransferServiceSlice
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type TransferServiceSliceSlice = prismic.SharedSlice<"transfer_service_slice", TransferServiceSliceSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			AboutUsDocument,
			AboutUsDocumentData,
			AboutUsDocumentDataSlicesSlice,
			AccomodationDocument,
			AccomodationDocumentData,
			AccomodationDocumentDataSlicesSlice,
			AccomodationSingleDocument,
			AccomodationSingleDocumentData,
			AccomodationSingleDocumentDataAmenitiesItem,
			AccomodationSingleDocumentDataFaqItem,
			AccomodationSingleDocumentDataGalleryItem,
			AccomodationSingleDocumentDataPricingItem,
			AccomodationSingleDocumentDataSlicesSlice,
			ContactDocument,
			ContactDocumentData,
			ContactDocumentDataSlicesSlice,
			ForRentersDocument,
			ForRentersDocumentData,
			ForRentersDocumentDataSlicesSlice,
			HomepageDocument,
			HomepageDocumentData,
			HomepageDocumentDataSlicesSlice,
			OwnersLandingDocument,
			OwnersLandingDocumentData,
			OwnersLandingDocumentDataSlicesSlice,
			PrivacyPolicyDocument,
			PrivacyPolicyDocumentData,
			PrivacyPolicyDocumentDataSlicesSlice,
			ServicesDocument,
			ServicesDocumentData,
			TermsAndConditionsDocument,
			TermsAndConditionsDocumentData,
			TermsAndConditionsDocumentDataSlicesSlice,
			ToursDocument,
			ToursDocumentData,
			ToursDocumentDataSlicesSlice,
			ToursSingleDocument,
			ToursSingleDocumentData,
			ToursSingleDocumentDataPriceIncludesItem,
			ToursSingleDocumentDataPriceExcludesItem,
			ToursSingleDocumentDataItineraryItem,
			ToursSingleDocumentDataFaqItem,
			ToursSingleDocumentDataGalleryItem,
			ToursSingleDocumentDataSlicesSlice,
			TransfersDocument,
			TransfersDocumentData,
			TransfersDocumentDataHowtobookItem,
			TransfersDocumentDataSlicesSlice,
			AllDocumentTypes,
			AccomodationListSlice,
			AccomodationListSliceDefaultPrimary,
			AccomodationListSliceVariation,
			AccomodationListSliceDefault,
			ContentSlice,
			ContentSliceDefaultPrimary,
			ContentSliceVariation,
			ContentSliceDefault,
			FaqSlice,
			FaqSliceDefaultPrimaryItemsItem,
			FaqSliceDefaultPrimary,
			FaqSliceVariation,
			FaqSliceDefault,
			FeatureGridSlice,
			FeatureGridSliceDefaultPrimaryItemsItem,
			FeatureGridSliceDefaultPrimary,
			FeatureGridSliceVariation,
			FeatureGridSliceDefault,
			ForRentersHeroSlice,
			ForRentersHeroSliceDefaultPrimaryHighlightsItem,
			ForRentersHeroSliceDefaultPrimaryServiceOptionsItem,
			ForRentersHeroSliceDefaultPrimary,
			ForRentersHeroSliceVariation,
			ForRentersHeroSliceDefault,
			GallerySlice,
			GallerySliceDefaultPrimary,
			GallerySliceDefaultItem,
			GallerySliceVariation,
			GallerySliceDefault,
			HeroSlice,
			HeroSliceDefaultPrimary,
			HeroSliceVariation,
			HeroSliceDefault,
			HeroWithSearchSlice,
			HeroWithSearchSliceDefaultPrimary,
			HeroWithSearchSliceVariation,
			HeroWithSearchSliceDefault,
			ImageSliderSlice,
			ImageSliderSliceDefaultItem,
			ImageSliderSliceVariation,
			ImageSliderSliceDefault,
			ProcessStepsSlice,
			ProcessStepsSliceDefaultPrimaryStepsItem,
			ProcessStepsSliceDefaultPrimary,
			ProcessStepsSliceVariation,
			ProcessStepsSliceDefault,
			TourListSlice,
			TourListSliceDefaultPrimary,
			TourListSliceVariation,
			TourListSliceDefault,
			TransferContactFormSliceSlice,
			TransferContactFormSliceSliceVariation,
			TransferContactFormSliceSliceDefault,
			TransferServiceSliceSlice,
			TransferServiceSliceSliceDefaultPrimaryHowtobookItem,
			TransferServiceSliceSliceDefaultPrimary,
			TransferServiceSliceSliceVariation,
			TransferServiceSliceSliceDefault
		}
	}
}