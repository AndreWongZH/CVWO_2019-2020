class Todo < ApplicationRecord
    def self.apply_sort(sort_by, ascend)
        if (ascend == 'ascending')
            return Todo.order(sort_by)
        elsif (ascend == 'descending')
            return Todo.order(sort_by).reverse_order()
        end
    end

    def self.apply_search(search)
        return Todo.where("title LIKE ? OR desc LIKE ?", "%#{search}%", "%#{search}%")
    end

end