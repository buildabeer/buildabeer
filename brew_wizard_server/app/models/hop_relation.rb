class HopRelation < ApplicationRecord
  belongs_to :hop
  belongs_to :hop_relation, :class_name => "Hop"

  after_save :createInverse
  after_destroy :deleteInverse

  validates :hop_id, uniqueness: { scope: :hop_relation_id }

  private

  def createInverse
    if HopRelation.where("hop_id = ? AND hop_relation_id = ?", self.hop_relation_id, self.hop_id).count == 0
      new_relation = HopRelation.new(hop_id: self.hop_relation_id, hop_relation_id: self.hop_id).save!
    end
  end

  def deleteInverse
    hop_relations = HopRelation.where("hop_id = ? AND hop_relation_id = ?", self.hop_relation_id, self.hop_id)
    if hop_relations.count != 0
      hop_relations.each do |relation|
        relation.destroy!
      end
    end
  end
end
