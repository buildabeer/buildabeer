class YeastRelation < ApplicationRecord
  belongs_to :yeast
  belongs_to :yeast_relation, :class_name => "Yeast"

  after_save :createInverse
  after_destroy :deleteInverse

  validates :yeast_id, uniqueness: { scope: :yeast_relation_id }

  private

  def createInverse
    if YeastRelation.where("yeast_id = ? AND yeast_relation_id = ?", self.yeast_relation_id, self.yeast_id).count == 0
      new_relation = YeastRelation.new(yeast_id: self.yeast_relation_id, yeast_relation_id: self.yeast_id).save!
    end
  end

  def deleteInverse
    yeast_relations = YeastRelation.where("yeast_id = ? AND yeast_relation_id = ?", self.yeast_relation_id, self.yeast_id)
    if yeast_relations.count != 0
      yeast_relations.each do |relation|
        relation.destroy!
      end
    end
  end
end
