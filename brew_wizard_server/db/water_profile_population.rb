light_lager = WaterProfile.new({
      profile_type: 'lager',
      strength: 'light',
      bitterness: 'soft',
      color: 'pale',
      calcium_min: 40,
      calcium_max: 60,
      alkalinity_min: 0,
      alkalinity_max: 40,
      sulfate_min: 0,
      sulfate_max: 50,
      chloride_min: 50,
      chloride_max: 100,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: -60,
      ra_max: 0,
      acidify: 'yes',
})

light_lager.save!

medium_pale_lager = WaterProfile.new({
      profile_type: 'lager',
      strength: 'medium',
      bitterness: 'moderate',
      bitterness_2: 'assertive',
      color: 'pale',
      calcium_min: 50,
      calcium_max: 75,
      alkalinity_min: 0,
      alkalinity_max: 40,
      sulfate_min: 50,
      sulfate_max: 150,
      chloride_min: 50,
      chloride_max: 100,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: -60,
      ra_max: 0,
      acidify: 'yes',
})

medium_pale_lager.save!

medium_amber_lager = WaterProfile.new({
      profile_type: 'lager',
      strength: 'medium',
      bitterness: 'soft',
      bitterness_2: 'moderate',
      color: 'amber',
      calcium_min: 50,
      calcium_max: 75,
      alkalinity_min: 40,
      alkalinity_max: 120,
      sulfate_min: 0,
      sulfate_max: 100,
      chloride_min: 50,
      chloride_max: 150,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: 0,
      ra_max: 60,
      acidify: 'maybe',
})

medium_amber_lager.save!

medium_dark_lager = WaterProfile.new({
      profile_type: 'lager',
      strength: 'medium',
      bitterness: 'soft',
      bitterness_2: 'moderate',
      color: 'brown/black',
      calcium_min: 50,
      calcium_max: 75,
      alkalinity_min: 80,
      alkalinity_max: 120,
      sulfate_min: 0,
      sulfate_max: 50,
      chloride_min: 50,
      chloride_max: 150,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: 40,
      ra_max: 80,
      acidify: 'no',
})

medium_dark_lager.save!

strong_amber_lager = WaterProfile.new({
      profile_type: 'lager',
      strength: 'strong',
      bitterness: 'soft',
      bitterness_2: 'moderate',
      color: 'amber',
      calcium_min: 50,
      calcium_max: 75,
      alkalinity_min: 40,
      alkalinity_max: 80,
      sulfate_min: 0,
      sulfate_max: 100,
      chloride_min: 50,
      chloride_max: 150,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: 0,
      ra_max: 60,
      acidify: 'maybe',
})

strong_amber_lager.save!

strong_dark_lager = WaterProfile.new({
      profile_type: 'lager',
      strength: 'strong',
      bitterness: 'soft',
      bitterness_2: 'moderate',
      color: 'brown/black',
      calcium_min: 50,
      calcium_max: 100,
      alkalinity_min: 80,
      alkalinity_max: 150,
      sulfate_min: 0,
      sulfate_max: 100,
      chloride_min: 50,
      chloride_max: 100,
      magnesium_min: 20,
      magnesium_max: 35,
      ra_min: 60,
      ra_max: 120,
      acidify: 'no',
})

strong_dark_lager.save!

light_pale_ale = WaterProfile.new({
      profile_type: 'ale',
      strength: 'light',
      bitterness: 'moderate',
      color: 'pale',
      calcium_min: 50,
      calcium_max: 100,
      alkalinity_min: 0,
      alkalinity_max: 80,
      sulfate_min: 100,
      sulfate_max: 200,
      chloride_min: 50,
      chloride_max: 100,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: -60,
      ra_max: 0,
      acidify: 'yes',
})

light_pale_ale.save!

light_amber_ale = WaterProfile.new({
      profile_type: 'ale',
      strength: 'light',
      bitterness: 'soft',
      bitterness_2: 'moderate',
      color: 'amber',
      calcium_min: 50,
      calcium_max: 150,
      alkalinity_min: 40,
      alkalinity_max: 120,
      sulfate_min: 100,
      sulfate_max: 200,
      chloride_min: 50,
      chloride_max: 100,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: 0,
      ra_max: 60,
      acidify: 'maybe',
})

light_amber_ale.save!

light_dark_ale = WaterProfile.new({
      profile_type: 'ale',
      strength: 'light',
      bitterness: 'moderate',
      color: 'brown/black',
      calcium_min: 50,
      calcium_max: 75,
      alkalinity_min: 80,
      alkalinity_max: 150,
      sulfate_min: 50,
      sulfate_max: 150,
      chloride_min: 50,
      chloride_max: 100,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: 30,
      ra_max: 90,
      acidify: 'maybe',
})

light_dark_ale.save!

medium_pale_less_ale = WaterProfile.new({
      profile_type: 'ale',
      strength: 'medium',
      bitterness: 'soft',
      bitterness_2: 'moderate',
      color: 'pale',
      calcium_min: 50,
      calcium_max: 100,
      alkalinity_min: 0,
      alkalinity_max: 80,
      sulfate_min: 0,
      sulfate_max: 50,
      chloride_min: 0,
      chloride_max: 100,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: -30,
      ra_max: 0,
      acidify: 'yes',
})

medium_pale_less_ale.save!

medium_pale_more_ale = WaterProfile.new({
      profile_type: 'ale',
      strength: 'medium',
      bitterness: 'moderate',
      bitterness_2: 'assertive',
      color: 'pale',
      calcium_min: 50,
      calcium_max: 150,
      alkalinity_min: 40,
      alkalinity_max: 120,
      sulfate_min: 100,
      sulfate_max: 400,
      chloride_min: 0,
      chloride_max: 100,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: -30,
      ra_max: 30,
      acidify: 'maybe',
})

medium_pale_more_ale.save!

medium_amber_ale = WaterProfile.new({
      profile_type: 'ale',
      strength: 'medium',
      bitterness: 'moderate',
      bitterness_2: 'assertive',
      color: 'amber',
      calcium_min: 50,
      calcium_max: 150,
      alkalinity_min: 40,
      alkalinity_max: 120,
      sulfate_min: 100,
      sulfate_max: 300,
      chloride_min: 50,
      chloride_max: 100,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: 0,
      ra_max: 60,
      acidify: 'no',
})

medium_amber_ale.save!

medium_dark_ale = WaterProfile.new({
      profile_type: 'ale',
      strength: 'medium',
      bitterness: 'moderate',
      bitterness_2: 'assertive',
      color: 'brown/black',
      calcium_min: 50,
      calcium_max: 75,
      alkalinity_min: 80,
      alkalinity_max: 160,
      sulfate_min: 50,
      sulfate_max: 150,
      chloride_min: 50,
      chloride_max: 150,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: 60,
      ra_max: 120,
      acidify: 'no',
})

medium_dark_ale.save!

strong_pale_ale = WaterProfile.new({
      profile_type: 'ale',
      strength: 'strong',
      bitterness: 'moderate',
      color: 'pale',
      calcium_min: 50,
      calcium_max: 100,
      alkalinity_min: 0,
      alkalinity_max: 40,
      sulfate_min: 50,
      sulfate_max: 100,
      chloride_min: 50,
      chloride_max: 100,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: -30,
      ra_max: 0,
      acidify: 'maybe',
})

strong_pale_ale.save!

strong_amber_ale = WaterProfile.new({
      profile_type: 'ale',
      strength: 'strong',
      bitterness: 'moderate',
      bitterness_2: 'assertive',
      color: 'amber',
      calcium_min: 50,
      calcium_max: 100,
      alkalinity_min: 40,
      alkalinity_max: 120,
      sulfate_min: 50,
      sulfate_max: 100,
      chloride_min: 50,
      chloride_max: 150,
      magnesium_min: 10,
      magnesium_max: 20,
      ra_min: 0,
      ra_max: 60,
      acidify: 'no',
})

strong_amber_ale.save!

strong_dark_ale = WaterProfile.new({
      profile_type: 'ale',
      strength: 'strong',
      bitterness: 'moderate',
      bitterness_2: 'assertive',
      color: 'brown/black',
      calcium_min: 50,
      calcium_max: 75,
      alkalinity_min: 120,
      alkalinity_max: 200,
      sulfate_min: 50,
      sulfate_max: 150,
      chloride_min: 50,
      chloride_max: 150,
      magnesium_min: 25,
      magnesium_max: 35,
      ra_min: 120,
      ra_max: 200,
      acidify: 'no',
})

strong_dark_ale.save!

Style.all.each do |style|
      if(style.water_profile_id == nil)
            str = ((style.min_og + (style.max_og - style.min_og) / 2) - 1) * 1000
            s_type = style.style_type.downcase
            color = style.min_color + (style.max_color - style.min_color) / 2
            bitterness = style.min_ibu + (style.max_ibu - style.min_ibu) / 2

            if s_type != 'ale' && s_type != 'lager'
                  s_type = "ale"
            end

            if str < 45
                  str = "light"
            elsif str < 65
                  str = "medium"
            else
                  str = "strong"
            end

            if color < 9
                  color = "pale"
            elsif color < 18
                  color = "amber"
            else
                  color = "brown/black"
            end

            if bitterness < 20
                  bitterness = "soft"
            elsif bitterness < 35
                  bitterness = "moderate"
            else
                  bitterness = "assertive"
            end

            puts "\n-------\n"
            puts style.name
            puts style.id
            puts "strength: " + str
            puts "bitterness: " + bitterness
            puts "type: " + s_type
            puts "color: " + color

            profile = WaterProfile.where("profile_type = ? AND strength = ? AND (bitterness = ? OR bitterness_2 = ?) AND color = ?",
                  s_type, str, bitterness, bitterness, color).first

            if(profile)
                  puts "profile: " + profile.id.to_s
                  style.water_profile_id = profile.id
                  style.save!
            else
                  profile = WaterProfile.where("profile_type = ? AND strength = ? AND color = ?",
                  s_type, str, color).first

                  if(profile)
                        puts "profile: " + profile.id.to_s
                        style.water_profile_id = profile.id
                        style.save!
                  end

            end
      end
end

Acid.create!({
      name: 'Hydrochloric 10%',
      strength: 10,
      quantity_for_normal: 348,
      molecular_weight: 36.46,
      density: 1.048,
      description: 'Adds chloride to the water, but has no effect on hardness.',
      })

Acid.create!({
      name: 'Hydrochloric 37%',
      strength: 37,
      quantity_for_normal: 83.5,
      molecular_weight: 36.46,
      density: 1.18,
      description: 'Adds chloride to the water, but has no effect on hardness.',
      })

Acid.create!({
      name: 'Lactic',
      strength: 88,
      quantity_for_normal: 84.7,
      molecular_weight: 90.09,
      density: 1.209,
      description: 'Adds lactate to the water, which may affect the flavor. No effect on hardness.',
      })

Acid.create!({
      name: 'Sulfuric 10%',
      strength: 10,
      quantity_for_normal: 458.3,
      molecular_weight: 98.079,
      density: 1.07,
      description: 'Adds sulfate to the water, but has no effect on the hardness.',
      })

Acid.create!({
      name: 'Sulfuric 98%',
      strength: 98,
      quantity_for_normal: 27.2,
      molecular_weight: 98.079,
      density: 1.84,
      description: 'Adds sulfate to the water, but has no effect on the hardness.',
      })

Acid.create!({
      name: 'Phosphoric 10%',
      strength: 10,
      quantity_for_normal: 935,
      molecular_weight: 97.994,
      density: 1.05,
      description: 'Adds phosphate to the water with minimal effect on flavor. It can reduce calcium in the water depending on the final pH.',
      })

Acid.create!({
      name: 'Phosphoric 85%',
      strength: 85,
      quantity_for_normal: 68,
      molecular_weight: 97.994,
      density: 1.69,
      description: 'Adds phosphate to the water with minimal effect on flavor. It can reduce calcium in the water depending on the final pH.',
      })

