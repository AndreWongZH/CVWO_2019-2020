class Todo < ApplicationRecord
    def self.apply_sort(sort_by, ascend)
        if (ascend == 'ascending')
            return Todo.order(sort_by)
        elsif (ascend == 'descending')
            return Todo.order(sort_by).reverse_order()
        end
    end

    def self.apply_search(search)
        return Todo.where("title LIKE ? OR describe LIKE ?", "%#{search}%", "%#{search}%")
    end

    def self.apply_tag(tag)
        if (tag == '')
            return Todo
        else
            return Todo.where("tag LIKE ?", "%#{tag}%")
        end
    end

    def self.search_past()
        return Todo.where(deadline: DateTime.yesterday..DateTime::Infinity.new)
    end

    def self.search_today()
        return Todo.where(deadline: Date.today.all_day)
    end

    def self.search_tmr()
        return Todo.where(deadline: Date.today.next_day)
    end

    def self.search_impt()
        return Todo.where("tag LIKE ?", "%important%")
    end

    def self.get_tags()
        return Todo.select("tag")
    end
    
end