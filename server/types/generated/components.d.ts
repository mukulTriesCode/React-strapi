import type { Schema, Struct } from '@strapi/strapi';

export interface HeroHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_hero_hero_sections';
  info: {
    displayName: 'Hero section';
    icon: 'gate';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'files' | 'images'>;
    Title: Schema.Attribute.String;
  };
}

export interface HeroHeroVertical extends Struct.ComponentSchema {
  collectionName: 'components_hero_hero_verticals';
  info: {
    displayName: 'Hero Vertical';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'files' | 'images'>;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'hero.hero-section': HeroHeroSection;
      'hero.hero-vertical': HeroHeroVertical;
    }
  }
}
