class Fichas::Vegetacion < ActiveRecord::Base

	self.table_name = "#{CONFIG.bases.fichasespecies}.vegetacion"
	self.primary_key = 'vegetacionId'

	has_many :relHabitatsVegetaciones , class_name: 'Relhabitatvegetacion'

end